import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { websiteMetadata } from "@/lib/data";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: websiteMetadata.title,
  description: websiteMetadata.description,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${inter.variable} ${jetbrainsMono.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <div className="relative min-h-screen overflow-x-clip">
            {/* GPU-friendly ambient radial gradients (zero expensive CSS blur filters) */}
            <div
              className="fixed inset-0 pointer-events-none opacity-90 dark:opacity-55"
              style={{
                backgroundImage: [
                  "radial-gradient(620px circle at 24% 8%, hsl(var(--primary) / 0.14), transparent 70%)",
                  "radial-gradient(560px circle at 82% 88%, hsl(var(--accent) / 0.12), transparent 70%)",
                  "radial-gradient(460px circle at 92% 38%, hsl(var(--primary) / 0.09), transparent 70%)",
                  "radial-gradient(440px circle at 8% 68%, hsl(var(--accent) / 0.08), transparent 70%)",
                ].join(", "),
              }}
            />

            {/* Subtle dot-grid overlay */}
            <div
              className="fixed inset-0 pointer-events-none opacity-[0.055] dark:opacity-[0.018]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
                backgroundSize: "36px 36px",
              }}
            />

            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
