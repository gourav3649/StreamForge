import React from "react";

type Props = {
  credits: number;
  tier: string;
};

const CreditTracker = ({ credits, tier }: Props) => {
  const remaining = isNaN(credits) ? 0 : credits;
  const isUnlimited = tier === "Unlimited" || remaining >= 99999;
  const total = isUnlimited ? 100 : tier === "Pro" ? 100 : 10;
  const used = isUnlimited ? 0 : Math.max(0, total - remaining);

  const usedPercent = isUnlimited ? 0 : Math.min(100, Math.max(0, (used / total) * 100));

  return (
    <div className="w-full max-w-5xl mx-auto px-6 pb-6">
      <div className="flex flex-col gap-3 p-4 rounded-xl border border-[var(--bg-border)] bg-[var(--bg-elevated)] w-full">
        <h3 className="text-[13px] font-medium text-[var(--text-primary)]">Credit tracker</h3>
        <div className="w-full bg-[var(--bg-base)] h-3 rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--accent)] rounded-full transition-all duration-500"
            style={{ width: `${usedPercent}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[11px] text-[var(--text-secondary)] font-medium">
          <span>{isUnlimited ? "Unlimited credits" : `${used} credits used`}</span>
          <span>{isUnlimited ? "∞" : `${total} total`}</span>
        </div>
      </div>
    </div>
  );
};

export default CreditTracker;
