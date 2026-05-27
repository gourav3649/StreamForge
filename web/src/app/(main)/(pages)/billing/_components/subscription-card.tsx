"use client";
import React from "react";

type Props = {
  onPayment(id: string, tier: string): void;
  products: any[];
  tier: string;
};

export const SubscriptionCard = ({ onPayment, products, tier }: Props) => {
  return (
    <section className="flex w-full justify-center lg:flex-row flex-col gap-6 px-6 max-w-6xl mx-auto">
      {products &&
        products.map((product: any) => {
          const rawNickname: string = product.nickname || "";
          const tierName =
            rawNickname.toLowerCase().includes("unlimited")
              ? "Unlimited"
              : rawNickname.toLowerCase().includes("pro")
              ? "Pro"
              : "Free";
          const isPro = tierName === "Pro";
          const isActive = tierName === tier;

          return (
            <div 
              key={product.id}
              className={`glass-panel rounded-2xl p-8 flex flex-col flex-1 relative transition-all duration-300 ${isPro ? "border-primary/50 shadow-[0_0_40px_rgba(244,63,94,0.1)] lg:scale-105 z-10" : "border-border-subtle hover:border-white/20"}`}
            >
              {isPro && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 kinetic-gradient text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">{product.nickname}</h3>
                <p className="text-on-surface-variant text-sm mb-6 h-10">
                  {tierName === "Unlimited"
                    ? "Unlimited credits for power users."
                    : tierName === "Pro"
                    ? "100 credits/mo. Best for growing projects."
                    : "10 credits/mo. Free forever."}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
                    {tierName === "Free"
                        ? "$0"
                        : tierName === "Pro"
                        ? "$29.99"
                        : "$99.99"}
                  </span>
                  <span className="text-on-surface-variant">/month</span>
                </div>
              </div>

              <div className="flex-1"></div>
              
              <div className="mt-8">
                {isActive ? (
                  <button disabled className="w-full py-4 text-center rounded-xl bg-surface-container border border-border-subtle text-on-surface-variant font-bold cursor-not-allowed">
                    Active Plan
                  </button>
                ) : (
                  <button
                    onClick={() => onPayment(product.id, tierName)} 
                    className={`w-full py-4 text-center rounded-xl font-bold transition-all ${isPro ? "kinetic-gradient text-white shadow-lg hover:brightness-110 active:scale-95" : "bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-95"}`}
                  >
                    {tierName === "Free" ? "Downgrade" : "Upgrade Now"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
    </section>
  );
};
