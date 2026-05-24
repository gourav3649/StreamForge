"use client";
import React from "react";

type Props = {
  onPayment(id: string, tier: string): void;
  products: any[];
  tier: string;
};

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const SubscriptionCard = ({ onPayment, products, tier }: Props) => {
  // Log products from Stripe to diagnose nickname/tier mapping
  console.log("[SubscriptionCard] Stripe products:", JSON.stringify(products.map((p: any) => ({ id: p.id, nickname: p.nickname }))));
  return (
    <section className="flex w-full justify-center md:flex-row flex-col gap-6 px-6 max-w-5xl mx-auto">
      {products &&
        products.map((product: any) => {
          // Determine the tier name for this product.
          // product.nickname is what Stripe returns for the price nickname.
          // We normalise it here to one of: "Free" | "Pro" | "Unlimited"
          const rawNickname: string = product.nickname || "";
          const tierName =
            rawNickname.toLowerCase().includes("unlimited")
              ? "Unlimited"
              : rawNickname.toLowerCase().includes("pro")
              ? "Pro"
              : "Free";
          const isPro = tierName === "Pro";
          return (
            <Card 
              className={`relative flex flex-col p-6 w-full max-w-sm rounded-[16px] bg-[var(--bg-surface)] border ${isPro ? "border-2 border-[var(--accent)]" : "border border-[var(--bg-border)]"} shadow-none`} 
              key={product.id}
            >
              {isPro && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[var(--accent)] text-white text-[11px] font-medium px-4 py-1 rounded-full whitespace-nowrap">
                  Most popular
                </div>
              )}
              <CardHeader className="p-0 mb-2">
                <CardTitle className="text-[16px] font-medium text-[var(--text-primary)]">{product.nickname}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 p-0 flex-grow">
                <CardDescription className="text-[13px] text-[var(--text-secondary)] leading-relaxed m-0 h-[40px]">
                  {product.nickname == "Unlimited"
                    ? "Unlimited credits\nFor power users"
                    : product.nickname == "Pro"
                    ? "100 credits/mo\nBest for growing projects"
                    : "10 credits/mo\nFree forever"}
                </CardDescription>
                
                <div className="flex flex-col mt-auto pb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="font-semibold text-[20px] text-[var(--text-primary)] font-sans">
                      {product.nickname == "Free"
                        ? "Free/mo"
                        : product.nickname == "Pro"
                        ? "$29.99/mo"
                        : "$99.99/mo"}
                    </span>
                  </div>
                </div>
                
                {product.nickname == tier ? (
                  <Button disabled variant="outline" className="w-full border-[var(--bg-border)] text-[var(--text-muted)] bg-[var(--bg-elevated)] font-medium rounded-md h-9 text-[13px]">
                    Active Plan
                  </Button>
                ) : (
                  <Button
                    onClick={() => onPayment(product.id, tierName)} 
                    variant={isPro ? "default" : "outline"}
                    className={`w-full font-medium rounded-md h-9 text-[13px] transition-colors ${isPro ? "bg-[var(--accent)] text-white hover:opacity-90 border-none" : "border-[var(--bg-border)] bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"}`}
                  >
                    {product.nickname === "Free" ? "Select" : "Upgrade"}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
    </section>
  );
};
