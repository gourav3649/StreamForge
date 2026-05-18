"use client";
import React, { useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserButton } from "@clerk/nextjs";
import MobileSideBar from "../sidebar/MobileSideBar";
import { useBilling } from "../providers/billing-provider";
import { onPaymentDetails } from "@/app/(main)/(pages)/billing/_actions/payment-connecetions";

type Props = {};

const InfoBar = (props: Props) => {
  const { credits, tier, setCredits, setTier } = useBilling();

  const onGetPayment = async () => {
    const response = await onPaymentDetails();
    if (response) {
      setTier(response.tier!);
      setCredits(response.credits.toString());
    }
  };

  useEffect(() => {
    onGetPayment();
  }, []);

  return (
    <div className="flex flex-row justify-end gap-6 items-center px-4 py-3 w-full dark:bg-black/50 backdrop-blur-sm border-b border-white/[0.06]">
      <MobileSideBar />
      <span className="flex items-center gap-2 text-sm">
        <span className="text-neutral-500">Credits</span>
        <span className="font-medium text-white">
          {tier === "Unlimited" ? (
            "Unlimited"
          ) : (
            <>
              {credits}/{tier === "Free" ? "10" : tier === "Pro" && "100"}
            </>
          )}
        </span>
      </span>
      <span className="flex items-center rounded-lg bg-white/[0.04] border border-white/[0.06] px-3">
        <Search size={16} className="text-neutral-500" />
        <Input
          placeholder="Quick Search"
          className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
        />
      </span>
      <UserButton />
    </div>
  );
};

export default InfoBar;
