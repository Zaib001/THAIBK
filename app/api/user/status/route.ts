import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = (session.user as any).id;
        const client = await clientPromise;
        const db = client.db();

        const user = await db.collection("users").findOne(
            { _id: new ObjectId(userId) },
            { projection: { usageCount: true, isPremium: true } }
        );

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            usageCount: user.usageCount || 0,
            isPremium: user.isPremium || false,
        });

    } catch (error: any) {
        console.error("FETCH_USER_STATUS_ERROR", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
