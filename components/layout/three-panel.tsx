'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Footer } from './footer';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import ThreeDPanel from '@/app/3d-panel/page';
import MobilePanel from '@/app/mobile-panel/page';

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
      return panel === "left" ? "90%" : panel === "right" ? "5%" : "5%";
    }
    if (activePanel === "right") {
      return panel === "left" ? "5%" : panel === "right" ? "26%" : "69%";
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
      <div className="relative flex-1">
        <main className="absolute inset-0 flex gap-0 p-2">
          <motion.div
            className="cursor-pointer relative group overflow-hidden"
            animate={{ width: getPanelWidth("left") }}
            transition={transition}
            onClick={() => setActivePanel(activePanel === "left" ? null : "left")}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className={`text-sm font-semibold text-zinc-400 [writing-mode:vertical-lr] rotate-180 transform transition-opacity duration-200 ${activePanel === "left" ? "opacity-0" : "opacity-100"}`}>
                3D View
              </h3>
            </div>
            <div className="h-full bg-zinc-900/50 rounded-lg overflow-hidden">
              <ThreeDPanel />
            </div>
          </motion.div>

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
            animate={{ width: getPanelWidth("middle") }}
            transition={transition}
            className="bg-zinc-900/30 rounded-lg p-4 relative"
          >
            <div className={`transition-opacity duration-300 ${activePanel === "left" ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
              {children}
            </div>
          </motion.div>

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
            className="cursor-pointer relative group overflow-hidden"
            animate={{ width: getPanelWidth("right") }}
            transition={transition}
            onClick={() => setActivePanel(activePanel === "right" ? null : "right")}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className={`text-sm font-semibold text-zinc-400 [writing-mode:vertical-lr] transition-opacity duration-200 ${activePanel === "right" ? "opacity-0" : "opacity-100"}`}>
                Mobile View
              </h3>
            </div>
            <div className="h-full bg-zinc-900/50 rounded-lg overflow-hidden">
              <MobilePanel />
            </div>
          </motion.div>
        </main>
      </div>
      <Footer />
    </div>
  );
} 