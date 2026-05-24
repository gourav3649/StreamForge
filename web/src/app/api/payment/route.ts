import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

export async function GET(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET!, {
      typescript: true,
      apiVersion: "2024-11-20.acacia",
    });

    const prices = await stripe.prices.list({
      limit: 3,
      expand: ["data.product"],
    });

    return NextResponse.json(prices.data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error fetching products" });
  }
}

export async function POST(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET!, {
      typescript: true,
      apiVersion: "2024-11-20.acacia",
    });
    const data = await req.json();

    if (!data.priceId) {
      return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
    }

    // Resolve the price nickname → tier name
    const price = await stripe.prices.retrieve(data.priceId);
    const tierName = (price.nickname as string) || "Free";

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: data.priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      // Embed the tier name in metadata so billing/page.tsx can read it reliably
      metadata: { tier: tierName },
      success_url: `${process.env.NEXT_PUBLIC_URL}/billing?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/billing`,
    });
    return NextResponse.json(session.url);
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
