import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="font-body-md text-body-md bg-background text-on-surface overflow-x-hidden min-h-screen">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-surface/80 backdrop-blur-xl flex justify-between items-center px-4 sm:px-margin-desktop shadow-md border-b border-border-subtle">
        <div className="flex items-center gap-base">
          <span className="font-headline-sm text-headline-sm font-bold text-primary">StreamForge</span>
        </div>
        <nav className="hidden md:flex gap-gutter items-center">
          <Link href="#features" className="text-on-surface-variant font-medium hover:text-primary transition-all">Workflows</Link>
          <Link href="#pricing" className="text-on-surface-variant font-medium hover:text-primary transition-all">Pricing</Link>
          <Link href="#" className="text-on-surface-variant font-medium hover:text-primary transition-all">Docs</Link>
        </nav>
        <div className="flex items-center gap-gutter">
          <div className="hidden sm:flex items-center gap-base text-primary font-bold bg-primary-container/10 px-4 py-1.5 rounded-full border border-primary/20">
            <span className="material-symbols-outlined text-sm">payments</span>
            <span className="font-label-md text-label-md">Unlimited Credits</span>
          </div>
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="primary-gradient text-white px-6 py-2 rounded-lg font-bold hover:brightness-110 active:scale-95 transition-all">Dashboard</Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <Link href="/dashboard" className="primary-gradient text-white px-6 py-2 rounded-lg font-bold hover:brightness-110 active:scale-95 transition-all">Get Started</Link>
          )}
        </div>
      </header>

      <main className="relative pt-16">
        {/* Ambient Kinetic Backgrounds */}
        <div className="kinetic-glow-bg top-0 -left-64" />
        <div className="kinetic-glow-bg bottom-0 -right-64" />

        {/* Hero Section */}
        <section className="relative min-h-[921px] flex flex-col items-center justify-center text-center px-4 sm:px-margin-desktop py-24 overflow-hidden">
          <div className="max-w-4xl z-10">
            <span className="font-label-md text-label-md text-primary uppercase tracking-widest mb-base block">Obsidian Kinetic Engine</span>
            <h1 className="font-display-lg text-display-lg mb-gutter animate-fade-in text-white leading-tight">
              Automate your <span className="text-transparent bg-clip-text primary-gradient">media engine</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
              The premium AI suite for creators. Seamlessly transcode video, generate cinematic assets, and automate production workflows with high-performance cloud infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-gutter justify-center items-center">
              <Link href="/dashboard" className="primary-gradient text-white px-10 py-4 rounded-xl font-bold text-lg hover:brightness-110 shadow-[0_0_30px_rgba(244,63,94,0.3)] transition-all">Get Started Free</Link>
              <button className="bg-surface-elevated text-on-surface border border-border-subtle px-10 py-4 rounded-xl font-bold text-lg hover:bg-surface-variant transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">play_circle</span> Watch Demo
              </button>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="mt-20 w-full max-w-5xl rounded-2xl overflow-hidden glass-card shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
            <img alt="StreamForge Workspace" className="w-full h-auto object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6shZRwB55lKIKmhvK6VnPwmKWYp7nnf2QYIZZ39D7F2I0Sc_o8XeK82b0ilBN5YbbdJ9nemXE7O-Y1sBUGzGx1HHiqri5U2JyIsA1EHwMM4wroKW9mxr_JdM3ktsDrZ-_x5aGhcWF7fDrZneMumVUS_u3Nejnx2ja7GMBsl_7SRE-mmcnud7X0chz96bvNuPxK1McfnigjnxaJZFVfIKxwQ2_-7VGZtmPnr0kuktmHtdVTVDpN0zo8MDR47z_A5beMWDMPBE2OcPK" />
            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
              <div className="glass-card p-4 rounded-lg flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-container/20 rounded-full flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>movie_edit</span>
                </div>
                <div className="text-left">
                  <p className="font-bold text-white">Transcoding Stream</p>
                  <p className="text-body-sm text-on-surface-variant">4K ProRes to H.265 • 89%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="px-4 sm:px-margin-desktop py-24 max-w-container-max mx-auto" id="features">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-white mb-base">Forge the Impossible</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">Harness the power of neural networks and distributed cloud nodes to accelerate your creative process.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter h-auto md:h-[600px]">
            {/* AI Image Editing */}
            <div className="md:col-span-8 glass-card rounded-2xl overflow-hidden p-gutter relative group">
              <div className="z-10 relative h-full flex flex-col justify-end">
                <span className="material-symbols-outlined text-primary text-4xl mb-base">image_search</span>
                <h3 className="font-headline-sm text-headline-sm text-white mb-base">Neural Image Re-imagination</h3>
                <p className="text-on-surface-variant max-w-md">Edit assets with natural language. Remove backgrounds, upscale to 8K, and generate variations in seconds without leaving your workspace.</p>
              </div>
              <img alt="AI Editing Interface" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCliZs_UpObRCMNAogu3Kner4VT2qFRf-hj3yFE1s-PFLBAN2VmKtCQsRnnGL2ALb8r1QRC7RsOb3LJpgmLNnGWp5d8bG8dF4j5UnZ-zpFmkI0joDffn-aobggLfHSjffghpNGgEDt983TtFnR9Vzd5hoa-jMuPuEg3ZaoSsxBo427W_-v5ArMI5i3cknCiraIlRUz77_dgYaNMJvPN8PcxS1Ld0en5dQeidVCwfUwwl4DpHOB6zrJZel6LZpxSgzy2Ca4VzSdonGd" />
            </div>

            {/* Video Transcoding */}
            <div className="md:col-span-4 glass-card rounded-2xl p-gutter flex flex-col justify-between border-tertiary/20">
              <div>
                <div className="w-14 h-14 bg-tertiary/10 rounded-xl flex items-center justify-center text-tertiary mb-gutter">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_sync</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-white mb-base">Elite Transcoding</h3>
                <p className="text-on-surface-variant">Distributed GPU nodes handle your most demanding 8K renders. Support for H.265, AV1, and ProRes RAW with sub-second latency.</p>
              </div>
              <div className="mt-base">
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full primary-gradient w-[75%]" />
                </div>
                <p className="text-body-sm text-on-surface-variant mt-2 flex justify-between">
                  <span>Processing...</span>
                  <span>75%</span>
                </p>
              </div>
            </div>

            {/* Workflows */}
            <div className="md:col-span-4 glass-card rounded-2xl p-gutter">
              <span className="material-symbols-outlined text-secondary text-4xl mb-base">account_tree</span>
              <h3 className="font-headline-sm text-headline-sm text-white mb-base">Visual Workflows</h3>
              <p className="text-on-surface-variant">Connect your favorite apps and automate the boring parts of media management with a node-based editor.</p>
            </div>

            {/* Global Distribution */}
            <div className="md:col-span-8 glass-card rounded-2xl p-gutter overflow-hidden relative">
              <div className="flex flex-col md:flex-row items-center gap-gutter h-full">
                <div className="flex-1 z-10">
                  <h3 className="font-headline-sm text-headline-sm text-white mb-base">Global Mesh Delivery</h3>
                  <p className="text-on-surface-variant">Your content, everywhere, instantly. Our edge network ensures zero buffering for your audience, no matter where they are.</p>
                </div>
                <div className="flex-1 w-full h-48 md:h-full relative opacity-50">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
                  <div className="flex flex-wrap gap-2 items-center justify-center h-full">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    <span className="w-2 h-2 rounded-full bg-tertiary" />
                    <span className="w-2 h-2 rounded-full bg-primary opacity-30" />
                    <span className="w-2 h-2 rounded-full bg-white opacity-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="px-4 sm:px-margin-desktop py-24 bg-surface-container-lowest" id="pricing">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-headline-lg text-headline-lg text-white mb-base">Fuel Your Growth</h2>
              <p className="text-on-surface-variant max-w-xl mx-auto">Transparent pricing designed for creators at every stage of their journey.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter items-stretch">
              {/* Free Tier */}
              <div className="glass-card rounded-2xl p-gutter flex flex-col border-border-subtle hover:border-white/20 transition-all">
                <div className="mb-gutter">
                  <h3 className="font-headline-sm text-headline-sm text-white mb-1">Free</h3>
                  <p className="text-on-surface-variant mb-gutter">For early creators</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">$0</span>
                    <span className="text-on-surface-variant">/month</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  <li className="flex gap-3 items-center text-on-surface">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    10 Monthly Credits
                  </li>
                  <li className="flex gap-3 items-center text-on-surface">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    720p Max Quality
                  </li>
                  <li className="flex gap-3 items-center text-on-surface">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    Community Support
                  </li>
                </ul>
                <Link href="/dashboard" className="w-full py-4 text-center rounded-xl border border-white/20 font-bold hover:bg-white/10 transition-all">Start For Free</Link>
              </div>

              {/* Pro Tier */}
              <div className="glass-card rounded-2xl p-gutter flex flex-col border-primary/50 relative shadow-[0_0_40px_rgba(244,63,94,0.1)] md:scale-105 z-10">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 primary-gradient text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Most Popular</div>
                <div className="mb-gutter">
                  <h3 className="font-headline-sm text-headline-sm text-white mb-1">Pro</h3>
                  <p className="text-on-surface-variant mb-gutter">100 credits included</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">$49</span>
                    <span className="text-on-surface-variant">/month</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  <li className="flex gap-3 items-center text-on-surface">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    100 Monthly Credits
                  </li>
                  <li className="flex gap-3 items-center text-on-surface">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    4K Cinematic Renders
                  </li>
                  <li className="flex gap-3 items-center text-on-surface">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    Priority Node Access
                  </li>
                  <li className="flex gap-3 items-center text-on-surface">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    Custom Automations
                  </li>
                </ul>
                <Link href="/dashboard" className="w-full py-4 text-center rounded-xl primary-gradient text-white font-bold hover:brightness-110 shadow-lg shadow-primary/20 transition-all">Get Pro Now</Link>
              </div>

              {/* Unlimited Tier */}
              <div className="glass-card rounded-2xl p-gutter flex flex-col border-border-subtle hover:border-white/20 transition-all">
                <div className="mb-gutter">
                  <h3 className="font-headline-sm text-headline-sm text-white mb-1">Unlimited</h3>
                  <p className="text-on-surface-variant mb-gutter">For studios & power users</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">$199</span>
                    <span className="text-on-surface-variant">/month</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  <li className="flex gap-3 items-center text-on-surface">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    Unlimited AI Generations
                  </li>
                  <li className="flex gap-3 items-center text-on-surface">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    8K Multi-track Rendering
                  </li>
                  <li className="flex gap-3 items-center text-on-surface">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    1-on-1 Dedicated Support
                  </li>
                  <li className="flex gap-3 items-center text-on-surface">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    Early Beta Access
                  </li>
                </ul>
                <Link href="/dashboard" className="w-full py-4 text-center rounded-xl border border-white/20 font-bold hover:bg-white/10 transition-all">Contact Sales</Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-margin-desktop py-32 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full primary-gradient opacity-10 blur-[120px] rounded-full" />
          <div className="max-w-3xl mx-auto z-10 relative">
            <h2 className="font-headline-lg text-headline-lg text-white mb-gutter">Ready to forge your future?</h2>
            <p className="text-on-surface-variant text-lg mb-10">Join 15,000+ creators who are already automating their production workflows with StreamForge.</p>
            <div className="flex flex-col sm:flex-row gap-gutter justify-center items-center">
              <input className="bg-surface border border-border-subtle text-white px-6 py-4 rounded-xl w-full sm:w-80 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" placeholder="Enter your email" type="email" />
              <Link href="/dashboard" className="primary-gradient text-center text-white px-10 py-4 rounded-xl font-bold w-full sm:w-auto hover:brightness-110 transition-all">Get Started</Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 sm:px-margin-desktop py-16 bg-background border-t border-border-subtle">
          <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-xs">
              <span className="font-headline-sm text-headline-sm font-bold text-primary mb-4 block">StreamForge</span>
              <p className="text-on-surface-variant">The leading platform for autonomous media production and AI-driven creative workflows. Built for the next generation of digital storytellers.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
              <div>
                <h4 className="font-bold text-white mb-6">Product</h4>
                <ul className="space-y-4 text-on-surface-variant">
                  <li><Link className="hover:text-primary transition-colors" href="#">Workflows</Link></li>
                  <li><Link className="hover:text-primary transition-colors" href="#">Transcoding</Link></li>
                  <li><Link className="hover:text-primary transition-colors" href="#">AI Studio</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-6">Resources</h4>
                <ul className="space-y-4 text-on-surface-variant">
                  <li><Link className="hover:text-primary transition-colors" href="#">Documentation</Link></li>
                  <li><Link className="hover:text-primary transition-colors" href="#">API Reference</Link></li>
                  <li><Link className="hover:text-primary transition-colors" href="#">Blog</Link></li>
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h4 className="font-bold text-white mb-6">Connect</h4>
                <div className="flex gap-4">
                  <Link className="w-10 h-10 rounded-lg bg-surface-elevated border border-border-subtle flex items-center justify-center hover:text-primary transition-all" href="#">
                    <span className="material-symbols-outlined text-sm">share</span>
                  </Link>
                  <Link className="w-10 h-10 rounded-lg bg-surface-elevated border border-border-subtle flex items-center justify-center hover:text-primary transition-all" href="#">
                    <span className="material-symbols-outlined text-sm">alternate_email</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-container-max mx-auto mt-16 pt-base border-t border-border-subtle flex flex-col sm:flex-row justify-between items-center text-body-sm text-on-surface-variant">
            <p>© 2024 StreamForge Inc. All rights reserved.</p>
            <div className="flex gap-gutter mt-4 sm:mt-0">
              <Link className="hover:text-white transition-colors" href="#">Privacy Policy</Link>
              <Link className="hover:text-white transition-colors" href="#">Terms of Service</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
