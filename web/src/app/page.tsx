import Navbar from "@/components/global/navbar";
import Link from "next/link";
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
    highlighted: false,
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
    highlighted: true,
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
    highlighted: false,
  },
];

export default function Home() {
  return (
    <main className="flex items-center justify-center flex-col bg-black text-white">
      <Navbar />

      {/* ─── Hero Section ─── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
        {/* Subtle gradient orbs — lightweight, no animation */}
        <div className="absolute top-[-20%] left-[50%] translate-x-[-50%] w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-500/8 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-neutral-400">
            <Zap size={14} className="text-violet-400" />
            AI-Powered Video Processing
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1]">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-neutral-500">
              Transform your media
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
              with StreamForge
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Transcode videos into multiple resolutions, edit with AI-powered
            tools, and manage your entire media workflow — all from one
            platform.
          </p>

          {/* CTA */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors duration-200"
            >
              Get Started Free
              <ArrowRight size={16} />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg border border-white/10 text-sm font-medium text-neutral-300 hover:bg-white/5 transition-colors duration-200"
            >
              See Features
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
          <p className="text-sm font-medium text-violet-400 uppercase tracking-wider">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Everything you need for video
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            From transcoding to AI editing, StreamForge gives you a complete
            toolkit to process, enhance, and share your media.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-violet-500/10 mb-4">
                <feature.icon size={20} className="text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
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
          <p className="text-sm font-medium text-violet-400 uppercase tracking-wider">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Start free, upgrade when you need more power. No hidden fees.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col p-8 rounded-xl border transition-all duration-300 ${
                plan.highlighted
                  ? "border-violet-500/50 bg-violet-500/[0.05]"
                  : "border-white/[0.06] bg-white/[0.02] hover:border-white/10"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-violet-500 text-xs font-semibold text-white">
                  Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm text-neutral-500">
                    {plan.period}
                  </span>
                </div>
                <p className="text-sm text-neutral-400 mt-2">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    {f.included ? (
                      <CheckIcon size={16} className="text-emerald-400 shrink-0" />
                    ) : (
                      <X size={16} className="text-neutral-600 shrink-0" />
                    )}
                    <span
                      className={
                        f.included ? "text-neutral-300" : "text-neutral-600"
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
                  plan.highlighted
                    ? "bg-violet-500 text-white hover:bg-violet-600"
                    : "border border-white/10 text-neutral-300 hover:bg-white/5"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="w-full max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="relative p-12 sm:p-16 rounded-2xl border border-white/[0.06] bg-gradient-to-b from-violet-500/[0.08] to-transparent overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_70%)] pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Ready to streamline your workflow?
            </h2>
            <p className="text-neutral-400 max-w-lg mx-auto">
              Join StreamForge and start processing your videos with AI-powered
              tools today. No credit card required.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors duration-200"
            >
              Get Started Free
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="w-full border-t border-white/[0.06] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600">
              <Zap size={12} className="text-white" />
            </div>
            <span className="text-sm font-medium text-neutral-400">
              StreamForge
            </span>
          </div>
          <p className="text-sm text-neutral-600">
            © {new Date().getFullYear()} StreamForge. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
