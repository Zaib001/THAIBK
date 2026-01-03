import clientPromise from "@/lib/db";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                const client = await clientPromise;
                const db = client.db();

                const user = await db.collection("users").findOne({
                    email: credentials.email.toLowerCase(),
                });

                if (!user || !user.password) {
                    throw new Error("No user found with this email");
                }

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordCorrect) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    usageCount: user.usageCount || 0,
                    isPremium: user.isPremium || false,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.usageCount = (user as any).usageCount;
                token.isPremium = (user as any).isPremium;
            }

            // Update token if triggered by session update
            if (trigger === "update") {
                if (session) {
                    // Manual update from frontend
                    token.usageCount = session.usageCount ?? token.usageCount;
                    token.isPremium = session.isPremium ?? token.isPremium;
                } else if (token.id) {
                    // Force refresh from database
                    try {
                        const client = await clientPromise;
                        const db = client.db();
                        const freshUser = await db.collection("users").findOne({
                            _id: new ObjectId(token.id as string)
                        });
                        if (freshUser) {
                            token.usageCount = freshUser.usageCount || 0;
                            token.isPremium = freshUser.isPremium || false;
                        }
                    } catch (error) {
                        console.error("JWT_REFRESH_ERROR", error);
                    }
                }
            }

            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).usageCount = token.usageCount;
                (session.user as any).isPremium = token.isPremium;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
