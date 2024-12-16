"use client";

import React from "react";
import { motion } from "framer-motion";
import { SubHeading, Paragraph } from "@/components/ui/typography";
import { Vault } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

//////////////////////////////////////////////////////
/// MOCK NFT DATA (Replace)
//////////////////////////////////////////////////////

const EXAMPLE_NFTS = [
  {
    id: "1",
    title: "Artwork #1",
    artist: "Artist Name",
    tokenStandard: "ERC-721",
  },
  {
    id: "2",
    title: "Artwork #2",
    artist: "Artist Name",
    tokenStandard: "ERC-721",
  },
  {
    id: "3",
    title: "Artwork #3",
    artist: "Artist Name",
    tokenStandard: "ERC-721",
  },
  {
    id: "4",
    title: "Artwork #4",
    artist: "Artist Name",
    tokenStandard: "ERC-721",
  },
  {
    id: "5",
    title: "Artwork #5",
    artist: "Artist Name",
    tokenStandard: "ERC-721",
  },
];

const MARKETPLACE_LINKS = [
  { name: "OpenSea", href: "https://opensea.io", logo: "/logos/opensea_logo.svg" },
  { name: "Magic Eden", href: "https://magiceden.io", logo: "/logos/magiceden_logo.svg" },
  { name: "Etherscan", href: "https://etherscan.io", logo: "/logos/etherscan_logo.svg" },
  { name: "Arweave", href: "https://arweave.org", logo: "/logos/arweave_logo.svg" },
];

const gradientPairs = [
  { from: '#52DBFF', to: '#7637FE' }, // aqua to purple
];

export default function VaultPage() {
  return (
    <div className="flex flex-col space-y-2">
      {/* SVG Gradients */}
      <svg width="0" height="0">
        <linearGradient id="icon-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop stopColor="#52DBFF" offset="0%" />
          <stop stopColor="#7637FE" offset="100%" />
        </linearGradient>
      </svg>

      {/* Introduction Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center space-y-6"
      >
        <div className="relative">
          <SubHeading className="font-orbitron text-xl text-white uppercase tracking-wider">
            Your NFT Vault
          </SubHeading>
          <motion.div 
            layoutId="sectionUnderline"
            className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-artcade-aqua to-artcade-purple"
          />
        </div>
        <div className="max-w-2xl">
          <Paragraph className="font-system">
            View and manage your earned NFTs from playing games and redeeming crates.
          </Paragraph>
        </div>
      </motion.div>

      {/* NFT Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        {EXAMPLE_NFTS.map((nft, index) => (
          <motion.div
            key={nft.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col gap-3"
          >
            {/* NFT Container */}
            <div className="artcade-container-vertical group relative" style={{ aspectRatio: '4/5' }}>
              <div className="artcade-hover-gradient" />
              <div className="artcade-hover-sweep" />
              <div className="absolute inset-3 bg-zinc-900 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.3)] ring-1 ring-white/10 overflow-hidden">
                {/* Icon Display */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Vault 
                    className="w-20 h-20 transition-all duration-300 opacity-40"
                    style={{
                      stroke: `url(#icon-gradient-3)`,
                      fill: 'none',
                      strokeWidth: 1.5
                    }}
                  />
                </div>
                
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
            <div className="artcade-container-vertical group relative h-[200px]">
              <div className="artcade-hover-gradient" />
              <div className="artcade-hover-sweep" />
              <div className="absolute inset-3 bg-zinc-900 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
                <div className="flex flex-col h-full w-full p-4">
                  {/* Title and Artist */}
                  <div className="space-y-1 mb-4">
                    <h3 className="font-orbitron text-sm text-white uppercase tracking-wider truncate">
                      {nft.title}
                    </h3>
                    <p className="font-system text-sm text-zinc-400">
                      by {nft.artist}
                    </p>
                  </div>

                  <div className="flex-1" />

                  {/* Token Standard */}
                  <div className="mb-4">
                    <span className="inline-flex items-center rounded-full bg-artcade-purple px-2 py-0.5 text-[10px] font-system text-white uppercase tracking-wider">
                      {nft.tokenStandard}
                    </span>
                  </div>

                  {/* Marketplace Icons */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    {MARKETPLACE_LINKS.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        className="opacity-60 hover:opacity-100 transition-opacity"
                      >
                        <Image
                          src={link.logo}
                          alt={link.name}
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                      </Link>
                    ))}
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
