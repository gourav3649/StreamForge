import React from "react";
import { Progress } from "@/components/ui/progress";

type Props = {
  credits: number;
  tier: string;
};

const CreditTracker = ({ credits, tier }: Props) => {
  const used = isNaN(credits) ? 0 : credits;
  const total = tier === "Unlimited" ? "Unlimited" : tier === "Pro" ? 100 : 10;
  
  const percentage = total === "Unlimited" ? 100 : Math.min(100, Math.max(0, (used / (total as number)) * 100));

  return (
    <div className="w-full max-w-5xl mx-auto px-6">
      <div className="flex flex-col gap-3 p-4 rounded-xl border border-[var(--bg-border)] bg-[var(--bg-elevated)] w-full">
        <h3 className="text-[13px] font-medium text-[var(--text-primary)]">Credit tracker</h3>
        <div className="w-full bg-[var(--bg-base)] h-3 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[var(--accent)] rounded-full" 
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[11px] text-[var(--text-secondary)] font-medium">
          <span>{used} credits used</span>
          <span>{total} total</span>
        </div>
      </div>
    </div>
  );
};

export default CreditTracker;
