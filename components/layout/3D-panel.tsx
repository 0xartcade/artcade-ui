'use client';

import { GlbIcon } from "@/components/icons/glb-icon";
import { useEffect, useState } from 'react';

//////////////////////////////////////////////////////
/// PANEL STATE MANAGEMENT
//////////////////////////////////////////////////////

export default function ThreeDPanel() {
  const [isMinimized, setIsMinimized] = useState(true);

  useEffect(() => {
    const checkSize = () => {
      const panel = document.getElementById('3d-panel');
      if (panel) {
        setIsMinimized(panel.offsetWidth < 100);
      }
    };

    checkSize();
    const observer = new ResizeObserver(checkSize);
    const panel = document.getElementById('3d-panel');
    if (panel) observer.observe(panel);

    return () => observer.disconnect();
  }, []);

//////////////////////////////////////////////////////
/// PANEL RENDER
//////////////////////////////////////////////////////

  return (
    <div id="3d-panel" className="h-full flex items-center justify-center bg-zinc-800/50 rounded-lg p-6">
      {!isMinimized && <GlbIcon />}
    </div>
  );
} 