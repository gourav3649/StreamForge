"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckIcon, X } from "lucide-react";

export const pricingPlans = [
  {
    name: "Hobby",
    price: "$0",
    period: "forever",
    description: "Perfect for exploring StreamForge's capabilities.",
    features: [
      { text: "3 transcodings / month", included: true },
      { text: "100MB storage", included: true },
      { text: "Basic editing tools", included: true },
      { text: "Priority support", included: false },
    ],
    cta: "Start Free",
  },
  {
    name: "Pro",
    price: "$29",
    period: "/ month",
    description: "For creators who need speed and advanced tools.",
    features: [
      { text: "10 transcodings / month", included: true },
      { text: "5GB storage", included: true },
      { text: "All editing tools", included: true },
      { text: "Priority support", included: true },
    ],
    cta: "Upgrade to Pro",
  },
  {
    name: "Unlimited",
    price: "$99",
    period: "/ month",
    description: "For teams and professionals with heavy workflows.",
    features: [
      { text: "Unlimited transcodings", included: true },
      { text: "50GB storage", included: true },
      { text: "Full tool suite", included: true },
      { text: "24/7 priority support", included: true },
    ],
    cta: "Go Unlimited",
  },
];

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState("Pro");

  return (
    <section
      id="pricing"
      className="w-full max-w-6xl mx-auto px-6 py-24"
    >
      <div className="text-center mb-16 space-y-4">
        <p className="text-sm font-medium text-[var(--accent)] uppercase tracking-wider">
          Pricing
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          Simple, transparent pricing
        </h2>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
          Start free, upgrade when you need more power. No hidden fees.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {pricingPlans.map((plan) => {
          const isHighlighted = selectedPlan === plan.name;
          return (
            <div
              key={plan.name}
              onClick={() => setSelectedPlan(plan.name)}
              className={`cursor-pointer relative flex flex-col p-8 rounded-[16px] border transition-all duration-300 ${
                isHighlighted
                  ? "border-[var(--accent)] bg-[var(--accent-subtle)]"
                  : "border-[var(--bg-border)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)]"
              }`}
            >
              {isHighlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[var(--accent)] text-[11px] font-medium text-white whitespace-nowrap">
                  Selected
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1 text-[var(--text-primary)]">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[var(--text-primary)]">{plan.price}</span>
                  <span className="text-sm text-[var(--text-secondary)]">
                    {plan.period}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    {f.included ? (
                      <CheckIcon size={16} className="text-emerald-500 shrink-0" />
                    ) : (
                      <X size={16} className="text-[var(--text-muted)] shrink-0" />
                    )}
                    <span
                      className={
                        f.included ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"
                      }
                    >
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/billing"
                className={`inline-flex items-center justify-center h-10 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isHighlighted
                    ? "bg-[var(--accent)] text-white hover:opacity-90"
                    : "border border-[var(--bg-border)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
