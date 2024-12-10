'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Footer } from './footer';
import ThreeDPanel from '@/app/3d-panel/page';
import MobilePanel from '@/app/mobile-panel/page';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRootPage = pathname === '/' || pathname === '/dev-logs';
  const [activePanel, setActivePanel] = useState<"left" | "right" | null>(null);

  const getPanelWidth = (panel: "left" | "middle" | "right") => {
    if (activePanel === "left") {
      return panel === "left" ? "90%" : panel === "right" ? "5%" : "0%";
    }
    if (activePanel === "right") {
      return panel === "left" ? "5%" : panel === "right" ? "33%" : "62%";
    }
    return panel === "middle" ? "90%" : "5%";
  };

  if (isRootPage) {
    return (
      <div className="flex flex-col min-h-screen">
        {children}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex gap-4 p-4">
        <motion.div
          className="cursor-pointer"
          animate={{ width: getPanelWidth("left") }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={() => setActivePanel(activePanel === "left" ? null : "left")}
        >
          <ThreeDPanel />
        </motion.div>
        
        <motion.div
          animate={{ 
            width: getPanelWidth("middle"),
            opacity: activePanel === "left" ? 0 : 1
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-zinc-900/30 rounded-lg p-4"
        >
          {children}
        </motion.div>

        <motion.div
          className="cursor-pointer"
          animate={{ width: getPanelWidth("right") }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={() => setActivePanel(activePanel === "right" ? null : "right")}
        >
          <MobilePanel />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
} 