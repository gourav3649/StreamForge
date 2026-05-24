import Navbar from "@/components/global/navbar";
import Link from "next/link";
import {
  Zap,
  Video,
  Scissors,
  Languages,
  Shield,
  BarChart3,
  Image,
  ArrowRight,
} from "lucide-react";
import PricingSection from "@/components/global/pricing";

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

export default function Home() {
  return (
    <main className="flex items-center justify-center flex-col bg-[var(--bg-base)] text-[var(--text-primary)]">
      <Navbar />

      {/* ─── Hero Section ─── */}
      <section className="relative w-full flex flex-col items-center justify-center px-4 sm:px-6 pt-28 pb-16 bg-[var(--bg-base)] min-h-screen">
        <div className="w-full max-w-5xl mx-auto rounded-[32px] bg-[var(--bg-surface)] border border-[var(--bg-border)] dark:bg-transparent dark:border-none shadow-sm dark:shadow-none relative overflow-hidden py-32 px-6 flex flex-col items-center">
          
          {/* Subtle gradient orbs — lightweight, no animation */}
          <div className="absolute top-[-20%] left-[50%] translate-x-[-50%] w-[600px] h-[600px] rounded-full bg-[var(--accent)]/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[var(--cta)]/5 blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8 flex flex-col items-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-[14px] py-[6px] rounded-full border border-[var(--bg-border)] bg-[var(--bg-elevated)] text-[13px] font-medium text-[var(--text-secondary)] shadow-sm">
              <span className="w-2 h-2 rounded-sm bg-[var(--accent)]" />
              AI-powered video processing
            </div>

            {/* Heading */}
            <h1 className="text-[56px] sm:text-[72px] font-normal tracking-tight leading-[1.05] font-serif">
              <span className="text-[var(--text-primary)] block dark:hidden">
                Video processing
              </span>
              <span className="text-[var(--accent)] italic block dark:hidden">
                built for creators.
              </span>
              <span className="text-[var(--text-primary)] hidden dark:block">
                Your media,
              </span>
              <span className="text-[var(--cta)] italic hidden dark:block">
                processed in seconds.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-[18px] sm:text-[20px] text-[var(--text-secondary)] max-w-[500px] mx-auto leading-[1.6] font-sans">
              Transcode, edit, and deliver video at any resolution — all in one platform.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-[8px] px-8 py-3.5 bg-[var(--cta)] hover:opacity-90 text-white text-[15px] font-medium transition-opacity duration-200"
              >
                Start for free &rarr;
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-[8px] px-8 py-3.5 bg-[var(--accent-subtle)] text-[var(--accent)] hover:opacity-80 text-[15px] font-medium transition-opacity duration-200"
              >
                See how it works
              </Link>
            </div>
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
      <PricingSection />

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
