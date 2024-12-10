"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function ThreePanel() {
  const [activePanel, setActivePanel] = useState<"left" | "right" | null>(null);

  const getPanelWidth = (panel: "left" | "middle" | "right") => {
    if (activePanel === "left") {
      return panel === "left" ? "90%" : panel === "right" ? "10%" : "0%";
    }
    if (activePanel === "right") {
      return panel === "left" ? "10%" : panel === "right" ? "33%" : "57%";
    }
    return panel === "middle" ? "80%" : "10%";
  };

  return (
    <div className="flex w-full h-[400px] gap-4">
      <motion.div
        className="bg-zinc-900/50 flex items-center justify-center cursor-pointer"
        animate={{ width: getPanelWidth("left") }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={() => setActivePanel(activePanel === "left" ? null : "left")}
      >
        <p className="text-zinc-500">Panel 1</p>
      </motion.div>

      <motion.div
        className="bg-zinc-900/50 flex items-center justify-center"
        animate={{ 
          width: getPanelWidth("middle"),
          opacity: activePanel === "left" ? 0 : 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <p className="text-zinc-500">Panel 2</p>
      </motion.div>

      <motion.div
        className="bg-zinc-900/50 flex items-center justify-center cursor-pointer"
        animate={{ width: getPanelWidth("right") }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={() => setActivePanel(activePanel === "right" ? null : "right")}
      >
        <p className="text-zinc-500">Panel 3</p>
      </motion.div>
    </div>
  );
}
