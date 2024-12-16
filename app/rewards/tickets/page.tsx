"use client";

import { Button } from "@/components/ui/button";
import { NFTImage } from "@/components/ui/nft-image";
import { SubHeading, Paragraph } from "@/components/ui/typography";
import { useAuth } from "@/lib/auth-context";
import { ticketContractAddress, ticketTokenId } from "@/lib/config";
import { web3Config } from "@/lib/web3config";
import Link from "next/link";
import { useEffect, useState } from "react";
import { parseAbi } from "viem";
import { readContract } from "wagmi/actions";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function TicketsPage() {
  const [ticketCount, setTicketCount] = useState(BigInt(0));
  const { user } = useAuth();

  async function fetchTickets() {
    if (!user) return;

    const balance = await readContract(web3Config, {
      address: ticketContractAddress as `0x${string}`,
      abi: parseAbi([
        "function balanceOf(address, uint256) view returns (uint256)",
      ]),
      functionName: "balanceOf",
      args: [user.eth_address, BigInt(ticketTokenId)],
    });

    setTicketCount(balance);
  }

  useEffect(() => {
    fetchTickets();
  }, [user]);

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
            Your Tickets
          </SubHeading>
          <motion.div 
            layoutId="sectionUnderline"
            className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-artcade-aqua to-artcade-purple"
          />
        </div>
        <div className="max-w-2xl">
          <Paragraph className="artcade-text">
            Redeem your tickets for exclusive NFT crates and climb the leaderboard.
          </Paragraph>
        </div>
      </motion.div>

      {/* Ticket Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-5 gap-8 h-[600px]"
      >
        {/* Left Column - NFT Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className={cn(
            "artcade-container-horizontal group md:col-span-2 h-full",
            "relative overflow-hidden"
          )}
        >
          <div className="artcade-hover-gradient" />
          <div className="artcade-hover-sweep" />
          <Image
            src="/tickets/0xArtcade_Ticket.jpg"
            alt="0xArtcade Ticket"
            width={400}
            height={400}
            className="w-full h-full object-cover rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.3)] ring-1 ring-white/10"
            priority
          />
        </motion.div>

        {/* Right Column - Ticket Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="artcade-container-horizontal group relative overflow-hidden md:col-span-3 h-full"
        >
          <div className="artcade-hover-gradient" />
          <div className="artcade-hover-sweep" />
          <div className="absolute inset-3 bg-zinc-900 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
            <div className="flex flex-col h-full w-full p-8">
              {/* Title Row */}
              <div className="flex justify-between items-center">
                <h2 className="font-orbitron text-xl text-white uppercase tracking-wider">
                  0xArtcade Ticket
                </h2>
                <span className="font-orbitron text-sm text-zinc-400 uppercase tracking-wider">
                  ERC-1155
                </span>
              </div>

              {/* Ticket Count - Centered */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="group-hover:scale-105 transition-all duration-300 font-orbitron text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-artcade-aqua via-artcade-purple to-artcade-pink mb-4">
                  {ticketCount.toLocaleString()}
                </div>
                <div className="font-orbitron text-xl text-white uppercase tracking-wider font-bold mb-8">
                  # of Tickets
                </div>
                <Link href="./crates">
                  <Button variant="retro" size="lg" className="font-orbitron">
                    Redeem Tickets
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
