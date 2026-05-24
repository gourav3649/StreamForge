"use client";
import React from "react";

type Props = {
  onPayment(id: string): void;
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
  //   console.log(products);
  return (
    <section className="flex w-full justify-center md:flex-row flex-col gap-6">
      {products &&
        products.map((product: any) => {
          const isPro = product.nickname === "Pro";
          return (
            <Card 
              className={`relative flex flex-col p-6 w-full max-w-sm rounded-xl bg-[var(--bg-surface)] border ${isPro ? "border-[2px] border-[var(--accent)]" : "border-[var(--bg-border)]"}`} 
              key={product.id}
            >
              {isPro && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most popular
                </div>
              )}
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-xl text-[var(--text-primary)]">{product.nickname}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6 p-0 flex-grow">
                <CardDescription className="text-[var(--text-secondary)] min-h-[60px]">
                  {product.nickname == "Unlimited"
                    ? "Unlimited credits every month. Best for teams running high-volume workflows."
                    : product.nickname == "Pro"
                    ? "100 credits per month. Ideal for small to medium-sized projects."
                    : "10 credits per month. Free forever — no card required."}
                </CardDescription>
                
                <div className="flex flex-col mt-auto pb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="font-medium text-[28px] text-[var(--text-primary)] font-sans">
                      ${product.nickname == "Free"
                        ? "0"
                        : product.nickname == "Pro"
                        ? "29.99"
                        : "99.99"}
                    </span>
                    <span className="text-[var(--text-secondary)] text-sm">/mo</span>
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm mt-1">
                    {product.nickname == "Free"
                      ? "10"
                      : product.nickname == "Pro"
                      ? "100"
                      : "Unlimited"}{" "}
                    credits
                  </p>
                </div>
                
                {product.nickname == tier ? (
                  <Button disabled variant="outline" className="w-full border-[var(--bg-border)] text-[var(--text-muted)] bg-[var(--bg-surface)] font-medium rounded-lg">
                    Active Plan
                  </Button>
                ) : (
                  <Button 
                    onClick={() => onPayment(product.id)} 
                    variant={isPro ? "default" : "outline"}
                    className={`w-full font-medium rounded-lg ${isPro ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]" : "border-[var(--bg-border)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"}`}
                  >
                    {product.nickname === "Free" ? "Get Started" : "Purchase"}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
    </section>
  );
};
