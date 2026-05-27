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
        let tierName = tierParam || "";
        if (!tierName) {
          const stripe = new Stripe(process.env.STRIPE_SECRET!, {
            typescript: true,
            apiVersion: "2024-11-20.acacia",
          });
          const session = await stripe.checkout.sessions.retrieve(session_id);
          tierName = (session.metadata?.tier as string) || "Free";
        }
        
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
    <div className="space-y-6 px-4 sm:px-margin-desktop py-8 max-w-7xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-2">Billing & Plans</h2>
        <p className="text-on-surface-variant font-body-lg">Manage your subscription and monitor usage.</p>
      </div>
      <BillingDashboard />
    </div>
  );
};

export default Billing;
