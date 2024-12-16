"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";

export function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isRootPage = pathname === "/";

  return (
    <div className="h-screen flex flex-col">
      {!isRootPage && <Header />}
      <main className="flex-1 container mx-auto px-4 py-2 flex flex-col">
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </main>
      {!isRootPage && <Footer />}
    </div>
  );
} 