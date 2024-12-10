'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Footer } from './footer';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export function ThreePanel({
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

  const transition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
    mass: 1.2,
    ease: "easeInOut"
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
      <main className="flex-1 flex gap-0 p-2 relative">
        <motion.div
          className="cursor-pointer relative group"
          animate={{ width: getPanelWidth("left") }}
          transition={transition}
          onClick={() => setActivePanel(activePanel === "left" ? null : "left")}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-sm font-semibold text-zinc-400 [writing-mode:vertical-lr] rotate-180 transform">3D View</h3>
          </div>
          <div className="h-full bg-zinc-900/50 rounded-lg" />
        </motion.div>

        {/* Left arrow */}
        <div 
          className="relative z-10 px-1 flex items-center cursor-pointer"
          onClick={() => setActivePanel(activePanel === "left" ? null : "left")}
        >
          {activePanel === "left" ? (
            <ChevronLeft className="w-6 h-6 text-zinc-300 opacity-50 hover:opacity-100 transition-opacity" />
          ) : (
            <ChevronRight className="w-6 h-6 text-zinc-300 opacity-50 hover:opacity-100 transition-opacity" />
          )}
        </div>
        
        <motion.div
          animate={{ 
            width: getPanelWidth("middle"),
            opacity: activePanel === "left" ? 0 : 1
          }}
          transition={{
            ...transition,
            opacity: { duration: 0.3, ease: "easeInOut" }
          }}
          className="bg-zinc-900/30 rounded-lg p-4"
        >
          {children}
        </motion.div>

        {/* Right arrow */}
        <div 
          className="relative z-10 px-1 flex items-center cursor-pointer"
          onClick={() => setActivePanel(activePanel === "right" ? null : "right")}
        >
          {activePanel === "right" ? (
            <ChevronRight className="w-6 h-6 text-zinc-300 opacity-50 hover:opacity-100 transition-opacity" />
          ) : (
            <ChevronLeft className="w-6 h-6 text-zinc-300 opacity-50 hover:opacity-100 transition-opacity" />
          )}
        </div>

        <motion.div
          className="cursor-pointer relative group"
          animate={{ width: getPanelWidth("right") }}
          transition={transition}
          onClick={() => setActivePanel(activePanel === "right" ? null : "right")}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-sm font-semibold text-zinc-400 [writing-mode:vertical-lr]">Mobile View</h3>
          </div>
          <div className="h-full bg-zinc-900/50 rounded-lg" />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
} 