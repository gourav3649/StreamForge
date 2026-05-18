import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { BillingProvider } from "@/components/providers/billing-provider";

const font = Inter({ subsets: ["latin"] });

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
        <body className={`${font.className} antialiased`}>
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
