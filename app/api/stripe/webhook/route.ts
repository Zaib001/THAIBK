import clientPromise from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { ObjectId } from "mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-01-27.acacia" as any,
});
// Add this temporarily at line 12
console.log("DEBUG: Webhook Secret length:", process.env.STRIPE_WEBHOOK_SECRET?.length || "UNDEFINED");

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error: any) {
        console.error(`Webhook signature verification failed: ${error.message}`);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        const userId = session.metadata?.userId;

        if (!userId) {
            return NextResponse.json({ error: "Missing userId in metadata" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db();

        // Update user to premium
        await db.collection("users").updateOne(
            { _id: new ObjectId(userId) },
            {
                $set: {
                    isPremium: true,
                    usageCount: 0,
                    stripeId: session.customer as string,
                    updatedAt: new Date(),
                },
            }
        );

        console.log(`User ${userId} upgraded to Premium!`);
    }

    return NextResponse.json({ received: true });
}
