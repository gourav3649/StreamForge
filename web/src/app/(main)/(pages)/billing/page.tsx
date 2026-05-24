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

      const session = await stripe.checkout.sessions.listLineItems(session_id);
      const user = await currentUser();
      if (user && session.data.length > 0) {
        // Use upsert or try/catch around update in case the clerk webhook failed and user isn't in DB yet
        const tierName = session.data[0].description;
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
        } catch (dbError) {
          console.error("Failed to update user in DB. They might not exist yet:", dbError);
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
