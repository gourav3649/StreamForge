"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useBilling } from "../providers/billing-provider";
import { onPaymentDetails } from "@/app/(main)/(pages)/billing/_actions/payment-connecetions";
import { usePathname } from "next/navigation";

const InfoBar = () => {
  const { credits, tier, setCredits, setTier } = useBilling();
  const pathname = usePathname();

  const onGetPayment = async () => {
    const response = await onPaymentDetails();
    if (response) {
      setTier(response.tier!);
      setCredits(response.credits.toString());
    }
  };

  useEffect(() => {
    onGetPayment();
  }, [pathname]);

  const displayCredits =
    credits === undefined || credits === null || isNaN(Number(credits))
      ? "—"
      : tier === "Unlimited" || Number(credits) >= 99999
      ? "Unlimited"
      : credits;

  return (
    <header className="fixed top-0 right-0 left-64 h-16 z-40 bg-surface/80 backdrop-blur-xl border-b border-border-subtle shadow-md flex justify-between items-center px-6">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors text-lg">search</span>
          <input 
            className="w-full bg-background border border-border-subtle rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" 
            placeholder="Search tasks, videos, or assets..." 
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Link href="/billing" className="hidden lg:flex items-center px-4 py-1.5 rounded-full bg-primary-container/10 border border-primary/20 text-primary font-label-md transition-transform active:scale-95 cursor-pointer hover:bg-primary-container/20">
          Credits: {displayCredits}
        </Link>
        <div className="flex items-center gap-3">
          <button className="p-2 text-on-surface-variant hover:text-primary transition-all">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 text-on-surface-variant hover:text-primary transition-all">
            <span className="material-symbols-outlined">help</span>
          </button>
          <div className="h-8 w-[1px] bg-border-subtle mx-2" />
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/50 flex items-center justify-center">
             <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default InfoBar;
