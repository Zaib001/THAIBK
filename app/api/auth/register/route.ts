// app/api/auth/register/route.ts
import clientPromise from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db();

        // Check if user exists
        const existingUser = await db.collection("users").findOne({
            email: email.toLowerCase(),
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user with MongoDB-compatible structure
        const result = await db.collection("users").insertOne({
            name: name || null,
            email: email.toLowerCase(),
            password: hashedPassword,
            usageCount: 0,
            isPremium: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return NextResponse.json({
            id: result.insertedId.toString(),
            email: email.toLowerCase(),
            name: name || null,
        }, { status: 201 });

    } catch (error: any) {
        console.error("REGISTRATION_ERROR", {
            message: error.message,
            stack: error.stack
        });

        return NextResponse.json(
            {
                error: "Internal Server Error",
                details: process.env.NODE_ENV === "development" ? error.message : undefined
            },
            { status: 500 }
        );
    }
}