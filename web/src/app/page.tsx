"use client";

import Navbar from "@/components/global/navbar";
import Link from "next/link";
import { useState } from "react";
import {
  CheckIcon,
  X,
  Zap,
  Video,
  Scissors,
  Languages,
  Shield,
  BarChart3,
  Image,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Upload & Transcode",
    description:
      "Drag and drop your videos. We transcode into multiple resolutions (360p, 480p, 720p, 1080p) for seamless playback anywhere.",
  },
  {
    icon: Scissors,
    title: "AI Smart Crop",
    description:
      "Automatically reframe your videos for YouTube, TikTok, or Instagram using AI-powered content-aware cropping.",
  },
  {
    icon: Languages,
    title: "Auto Transcription",
    description:
      "Generate captions and subtitles in multiple languages with a single click. Make your content globally accessible.",
  },
  {
    icon: Image,
    title: "Background Removal",
    description:
      "Remove or replace backgrounds from images and video frames using Cloudinary's AI engine.",
  },
  {
    icon: Shield,
    title: "Secure Sharing",
    description:
      "Share videos with customizable embeds, domain locks, and expiration dates to keep your content protected.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Track views, engagement, and watch time with a built-in analytics dashboard for every video.",
  },
];

const pricingPlans = [
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

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState("Pro");

  return (
    <main className="flex items-center justify-center flex-col bg-[var(--bg-base)] text-[var(--text-primary)]">
      <Navbar />

      {/* ─── Hero Section ─── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden bg-[var(--bg-base)]">
        {/* Subtle gradient orbs — lightweight, no animation */}
        <div className="absolute top-[-20%] left-[50%] translate-x-[-50%] w-[600px] h-[600px] rounded-full bg-[var(--accent)]/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[var(--cta)]/5 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-[14px] py-[4px] rounded-[20px] border border-[var(--bg-border)] bg-[var(--bg-elevated)] text-[13px] text-[var(--text-secondary)]">
            <Zap size={14} className="text-[var(--accent)]" />
            AI-powered video processing
          </div>

          {/* Heading */}
          <h1 className="text-[64px] font-normal tracking-tight leading-[1.1] font-serif">
            <span className="text-[var(--text-primary)]">
              Your media,
            </span>
            <br />
            <span className="text-[var(--cta)] italic">
              processed in seconds.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-[18px] text-[var(--text-secondary)] max-w-[520px] mx-auto leading-[1.7] font-sans">
            Transcode, edit, and deliver video at any resolution — all in one platform.
          </p>

          {/* CTA */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-[8px] px-[24px] py-[12px] bg-[var(--cta)] hover:bg-[var(--cta-hover)] text-white text-sm font-medium transition-colors duration-200"
            >
              Start for free
              <ArrowRight size={16} />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center gap-2 rounded-[8px] px-[24px] py-[12px] border border-[var(--bg-border)] bg-transparent hover:bg-[var(--bg-elevated)] text-[var(--accent)] text-sm font-medium transition-colors duration-200"
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Features Section ─── */}
      <section
        id="features"
        className="w-full max-w-6xl mx-auto px-6 py-24"
      >
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-medium text-[var(--accent)] uppercase tracking-wider">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            Everything you need for video
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            From transcoding to AI editing, StreamForge gives you a complete
            toolkit to process, enhance, and share your media.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl border border-[var(--bg-border)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] transition-all duration-300 shadow-sm"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--accent-subtle)] mb-4">
                <feature.icon size={20} className="text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">{feature.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Pricing Section ─── */}
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
                className={`cursor-pointer relative flex flex-col p-8 rounded-xl border transition-all duration-300 ${
                  isHighlighted
                    ? "border-[var(--accent)] bg-[var(--accent-subtle)]"
                    : "border-[var(--bg-border)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)]"
                }`}
              >
                {isHighlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[var(--accent)] text-xs font-semibold text-white">
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
                  className={`inline-flex items-center justify-center h-10 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isHighlighted
                      ? "bg-[var(--accent)] text-white hover:opacity-90"
                      : "border border-[var(--bg-border)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="w-full max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="relative p-12 sm:p-16 rounded-2xl border border-[var(--bg-border)] bg-[var(--bg-surface)] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--accent-subtle),transparent_70%)] pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Ready to streamline your workflow?
            </h2>
            <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
              Join StreamForge and start processing your videos with AI-powered
              tools today. No credit card required.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-[var(--text-primary)] text-[var(--bg-base)] text-sm font-semibold hover:opacity-90 transition-opacity duration-200"
            >
              Get Started Free
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="w-full border-t border-[var(--bg-border)] py-8 px-6 bg-[var(--bg-base)]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-[var(--accent)]">
              <Zap size={12} className="text-white" />
            </div>
            <span className="text-sm font-medium text-[var(--text-secondary)]">
              StreamForge
            </span>
          </div>
          <p className="text-sm text-[var(--text-muted)]">
            © {new Date().getFullYear()} StreamForge. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
