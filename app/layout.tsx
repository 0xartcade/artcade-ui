import type { Metadata } from "next"; // Next.js metadata types
import { Monoton, Lato, IBM_Plex_Mono } from "next/font/google"; // Google fonts
import "./globals.css"; // Global styles
import { ThemeProvider } from "next-themes"; // Theme management
import { ThreePanel } from "@/components/layout/three-panel"; // 3D panel component
import { AuthProvider } from "@/lib/auth-context"; // Authentication context
import { Web3Provider } from "@/components/layout/web3-provider";
import { Toaster } from "@/components/ui/sonner";

//////////////////////////////////////////////////////
/// FONT CONFIGURATIONS
//////////////////////////////////////////////////////

const titleFont = Monoton({
  weight: "400",
  subsets: ["latin"],
  variable: "--title-font", // CSS variable for title font
});

const sansFont = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--sans-font", // CSS variable for sans-serif font
});

const monoFont = IBM_Plex_Mono({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--mono-font", // CSS variable for monospace font
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
        className={`${titleFont.variable} ${sansFont.variable} ${monoFont.variable} font-sans min-h-screen flex flex-col bg-zinc-950 text-zinc-50`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false} // Disable system theme detection
        >
          <Web3Provider>
            <AuthProvider>
              <div className="flex flex-col min-h-screen">
                <ThreePanel>{children}</ThreePanel>
              </div>
            </AuthProvider>
          </Web3Provider>
        </ThemeProvider>
        <Toaster position="bottom-center" duration={5_000} closeButton={true} />
      </body>
    </html>
  );
}
