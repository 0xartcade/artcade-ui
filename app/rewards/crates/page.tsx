"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";
import { NFTImage } from "@/components/ui/nft-image";
import { usePathname } from "next/navigation";
import { SubHeading, Paragraph } from "@/components/ui/typography";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface CrateOption {
  name: string;
  ticketCost: number;
  status?: string;
  image: string;
}

//////////////////////////////////////////////////////
/// MOCK Crates DATA (Replace)
//////////////////////////////////////////////////////

const CRATE_OPTIONS: CrateOption[] = [
  { name: "Bronze", ticketCost: 1000, status: "Coming Soon", image: "/crates/0xArtcade_Crate_Bronze.png" },
  { name: "Silver", ticketCost: 2000, status: "Coming Soon", image: "/crates/0xArtcade_Crate_Silver.png" },
  { name: "Gold", ticketCost: 3500, status: "Coming Soon", image: "/crates/0xArtcade_Crate_Gold.png" },
  { name: "Platinum", ticketCost: 5000, status: "Coming Soon", image: "/crates/0xArtcade_Crate_Platinum.png" },
  { name: "Diamond", ticketCost: 10000, status: "Coming Soon", image: "/crates/0xArtcade_Crate_Diamond.png" },
];

export default function CratesPage() {
  return (
    <div className="flex flex-col space-y-8">
      {/* Introduction Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center space-y-6"
      >
        <div className="relative">
          <SubHeading className="font-orbitron text-xl text-white uppercase tracking-wider">
            NFT Crates
          </SubHeading>
          <motion.div 
            layoutId="sectionUnderline"
            className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-artcade-aqua to-artcade-purple"
          />
        </div>
        <div className="max-w-2xl">
          <Paragraph className="artcade-text">
            Burn tickets in exchange for NFT crates filled with real art. 
          </Paragraph>
        </div>
      </motion.div>

      {/* Crates Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
      >
        {CRATE_OPTIONS.map((crate, index) => (
          <motion.div
            key={crate.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "flex flex-col gap-3",
              crate.status && "opacity-50"
            )}
          >
            {/* Image Container */}
            <div className="artcade-container-vertical group relative aspect-square">
              <div className="artcade-hover-gradient" />
              <div className="artcade-hover-sweep" />
              <div className="absolute inset-3 bg-zinc-900 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.3)] ring-1 ring-white/10 overflow-hidden">
                {/* Base image with constant dark effect */}
                <Image
                  src={crate.image}
                  alt={crate.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover opacity-60 scale-110 transform brightness-50 contrast-125 saturate-50"
                  priority
                />
                
                {/* Coming Soon Overlay - appears on hover */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center">
                  <div className="relative">
                    {/* Glow effect behind text */}
                    <div className="absolute inset-0 blur-xl bg-gradient-to-r from-artcade-aqua to-artcade-purple opacity-50" />
                    
                    {/* Coming Soon Text */}
                    <div className="relative">
                      <div className="font-monoton text-3xl text-white tracking-wider mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-artcade-aqua to-artcade-purple uppercase">
                        Coming Soon
                      </div>
                      <div className="h-px w-full bg-gradient-to-r from-artcade-aqua to-artcade-purple" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Container */}
            <div className="artcade-container-vertical group relative h-[120px]">
              <div className="artcade-hover-gradient" />
              <div className="artcade-hover-sweep" />
              <div className="absolute inset-3 bg-zinc-900 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
                <div className="flex flex-col items-center justify-center h-full w-full p-6">
                  <div className="flex flex-col items-center gap-3">
                    <div className="font-orbitron text-lg text-white uppercase tracking-wider">
                      {crate.name}
                    </div>
                    <div className="font-orbitron text-sm text-zinc-400 uppercase tracking-wider">
                      Coming Soon
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
