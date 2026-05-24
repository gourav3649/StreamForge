import React from "react";
import Stripe from "stripe";

import { db } from "@/lib/db";
import BillingDashboard from "./_components/billing-dashboard";
import { currentUser } from "@clerk/nextjs/server";

type Props = {
  searchParams?: { [key: string]: string | undefined };
};

const Billing = async (props: Props) => {
  const { session_id, tier: tierParam } = props.searchParams ?? {};

  if (session_id) {
    try {
      const user = await currentUser();
      if (user) {
        // Primary: read tier from the URL param we embedded at checkout creation.
        // Fallback: retrieve from Stripe session metadata.
        let tierName = tierParam || "";

        if (!tierName) {
          const stripe = new Stripe(process.env.STRIPE_SECRET!, {
            typescript: true,
            apiVersion: "2024-11-20.acacia",
          });
          const session = await stripe.checkout.sessions.retrieve(session_id);
          tierName =
            (session.metadata?.tier as string) ||
            "Free";
          console.log("[billing] Fallback Stripe session metadata tier:", tierName, "| payment_status:", session.payment_status);
        }

        // Normalise to known values
        const normalisedTier =
          tierName.toLowerCase().includes("unlimited")
            ? "Unlimited"
            : tierName.toLowerCase().includes("pro")
            ? "Pro"
            : "Free";

        const creditsAmount =
          normalisedTier === "Unlimited"
            ? 999999
            : normalisedTier === "Pro"
            ? 100
            : 10;

        console.log(`[billing] Updating user ${user.id} → tier=${normalisedTier}, credits=${creditsAmount}`);

        try {
          await db.user.update({
            where: { clerkId: user.id },
            data: {
              tier: normalisedTier,
              credits: creditsAmount,
            },
          });
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
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b border-[var(--bg-border)] bg-[var(--bg-base)]/80 p-6 text-[32px] font-bold font-serif backdrop-blur-lg">
        Billing
      </h1>
      <BillingDashboard />
    </div>
  );
};

export default Billing;
