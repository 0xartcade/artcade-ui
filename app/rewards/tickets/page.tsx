'use client';

import { NFTImage } from "@/components/ui/nft-image";
import { TicketStatus } from "@/components/ui/ticket-status";
import Link from "next/link";

export default function TicketsPage() {
  const totalTickets = 21000; // Example from leaderboard data

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - NFT Image */}
        <div className="aspect-square rounded-3xl bg-zinc-900/50 border border-zinc-800/50 overflow-hidden">
          <NFTImage />
        </div>

        {/* Right Column - Ticket Info */}
        <div className="flex flex-col h-full p-8">
          {/* Title Row */}
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-medium">0xArtcade Ticket</h2>
            <span className="text-sm text-zinc-400">ERC-1155</span>
          </div>

          {/* Ticket Count - Centered */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-8xl font-bold mb-2">{totalTickets.toLocaleString()}</div>
            <div className="text-lg text-zinc-400"># of Tickets</div>
          </div>
        </div>
      </div>

      {/* Marketplace Links */}
      <div className="mt-8 flex justify-center gap-4">
        <Link 
          href="https://opensea.io" 
          target="_blank"
          className="px-6 py-2 rounded-full bg-zinc-900/50 border border-zinc-800/50 text-sm text-zinc-400 hover:bg-zinc-900 transition-colors"
        >
          Open Sea
        </Link>
        <Link 
          href="https://magiceden.io" 
          target="_blank"
          className="px-6 py-2 rounded-full bg-zinc-900/50 border border-zinc-800/50 text-sm text-zinc-400 hover:bg-zinc-900 transition-colors"
        >
          Magic Eden
        </Link>
        <Link 
          href="https://etherscan.io" 
          target="_blank"
          className="px-6 py-2 rounded-full bg-zinc-900/50 border border-zinc-800/50 text-sm text-zinc-400 hover:bg-zinc-900 transition-colors"
        >
          Etherscan
        </Link>
        <Link 
          href="https://arweave.org" 
          target="_blank"
          className="px-6 py-2 rounded-full bg-zinc-900/50 border border-zinc-800/50 text-sm text-zinc-400 hover:bg-zinc-900 transition-colors"
        >
          Arweave
        </Link>
      </div>
    </div>
  );
} 