import React from "react";
import Stripe from "stripe";

import { db } from "@/lib/db";
import BillingDashboard from "./_components/billing-dashboard";
import { currentUser } from "@clerk/nextjs/server";

type Props = {
  searchParams?: { [key: string]: string | undefined };
};

const Billing = async (props: Props) => {
  const { session_id } = props.searchParams ?? {
    session_id: "",
  };
  if (session_id) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET!, {
        typescript: true,
        apiVersion: "2024-11-20.acacia",
      });

      // Retrieve the session itself (not line items) to get our metadata
      const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ["line_items.data.price.product"],
      });

      const user = await currentUser();
      if (user && session.payment_status === "paid") {
        // We embed tier in metadata at checkout creation time
        const tierName: string =
          (session.metadata?.tier as string) ||
          // fallback: try to read from line item price nickname
          (session.line_items?.data?.[0]?.price?.nickname as string) ||
          "Free";

        const creditsAmount =
          tierName === "Unlimited"
            ? "Unlimited"
            : tierName === "Pro"
            ? "100"
            : "10";

        try {
          await db.user.update({
            where: { clerkId: user.id },
            data: {
              tier: tierName,
              credits: creditsAmount,
            },
          });
          console.log(`[billing] Updated user ${user.id} → tier=${tierName}, credits=${creditsAmount}`);
        } catch (dbError) {
          console.error("Failed to update user in DB:", dbError);
        }
      }
    } catch (error) {
      console.error("Error processing Stripe session:", error);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
        <span>Billing</span>
      </h1>
      <BillingDashboard />
    </div>
  );
};

export default Billing;
