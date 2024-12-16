import type { Metadata } from "next"; // Next.js metadata types
import {
  Monoton,
  IBM_Plex_Mono,
  Orbitron,
  Nunito_Sans,
} from "next/font/google"; // Google fonts
import "./globals.css"; // Global styles
import { ThemeProvider } from "next-themes"; // Theme management
import { AuthProvider } from "@/lib/auth-context"; // Authentication context
import { Web3Provider } from "@/components/layout/web3-provider";
import { Toaster } from "@/components/ui/sonner";
import { RootLayoutContent } from "@/components/layout/root-layout-content";

//////////////////////////////////////////////////////
/// FONT CONFIGURATIONS
//////////////////////////////////////////////////////

const titleFont = Monoton({
  weight: "400",
  subsets: ["latin"],
  variable: "--title-font", // CSS variable for title font
});

const sansFont = Nunito_Sans({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--sans-font", // CSS variable for sans-serif font
});

const monoFont = IBM_Plex_Mono({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--mono-font", // CSS variable for monospace font
});

const orbitronFont = Orbitron({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--orbitron-font", // CSS variable for Orbitron font
});

//////////////////////////////////////////////////////
/// METADATA
//////////////////////////////////////////////////////

export const metadata: Metadata = {
  title: "Artcade",
  description: "Gamified Art Discovery",
};

//////////////////////////////////////////////////////
/// ROOT LAYOUT
//////////////////////////////////////////////////////

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${titleFont.variable} ${sansFont.variable} ${monoFont.variable} ${orbitronFont.variable} bg-black text-zinc-50 font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <Web3Provider>
            <AuthProvider>
              <RootLayoutContent>{children}</RootLayoutContent>
            </AuthProvider>
          </Web3Provider>
        </ThemeProvider>
        <Toaster position="bottom-center" duration={5_000} closeButton={true} />
      </body>
    </html>
  );
}
