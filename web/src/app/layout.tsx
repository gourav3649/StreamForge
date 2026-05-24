import type { Metadata } from "next";
import "./globals.css";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { BillingProvider } from "@/components/providers/billing-provider";

const font = Inter({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "StreamForge — Video Transcoding & AI Media Editor",
  description:
    "Transcode, edit, and manage your video content with AI-powered tools. Smart crop, background removal, transcription, and multi-resolution transcoding — all in one platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap" rel="stylesheet" />
        </head>
        <body className={`font-sans antialiased selection:bg-violet-500/30 selection:text-violet-200`}>
          <BillingProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              storageKey="streamforge-theme"
            >
              {children}
              <Toaster position="bottom-right" />
            </ThemeProvider>
          </BillingProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
