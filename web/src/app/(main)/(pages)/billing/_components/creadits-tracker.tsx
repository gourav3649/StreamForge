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
    <div className="w-full max-w-5xl mx-auto px-6 pb-6 mt-8">
      <div className="flex flex-col gap-4 p-8 rounded-2xl glass-panel border border-border-subtle w-full max-w-3xl mx-auto relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <span className="material-symbols-outlined text-8xl">bolt</span>
        </div>
        
        <div className="relative z-10">
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Usage & Credits</h3>
          <p className="text-on-surface-variant text-sm mb-6">Monitor your API calls and resource usage for the current billing cycle.</p>
          
          <div className="flex justify-between items-end mb-2">
            <div>
              <span className="text-3xl font-bold text-primary">{isUnlimited ? "Unlimited" : used}</span>
              <span className="text-on-surface-variant ml-2">credits used</span>
            </div>
            <div className="text-on-surface-variant font-medium">
              <span>{isUnlimited ? "∞" : `${total} total`}</span>
            </div>
          </div>
          
          <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden">
            <div
              className="h-full kinetic-gradient rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${usedPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditTracker;
