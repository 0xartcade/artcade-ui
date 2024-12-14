"use client";

import Button from "@/components/ui/button";
import { NFTImage } from "@/components/ui/nft-image";
import { useAuth } from "@/lib/auth-context";
import { ticketContractAddress, ticketTokenId } from "@/lib/config";
import { web3Config } from "@/lib/web3config";
import Link from "next/link";
import { useEffect, useState } from "react";
import { parseAbi } from "viem";
import { readContract } from "wagmi/actions";

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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - NFT Image */}
        <div className="aspect-square rounded-3xl bg-zinc-900/50 border border-zinc-800/50 overflow-hidden">
          <NFTImage />
        </div>

        {/* Right Column - Ticket Info */}
        <div className="flex flex-col h-full p-8">
          {/* Title Row */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-medium">0xArtcade Ticket</h2>
            <span className="text-sm text-zinc-400">ERC-1155</span>
          </div>

          {/* Ticket Count - Centered */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-8xl font-bold mb-2">
              {ticketCount.toLocaleString()}
            </div>
            <div className="text-lg text-zinc-400"># of Tickets</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 flex justify-center gap-4">
        <Link href="./crates">
          <Button variant="secondary">Redeem Tickets</Button>
        </Link>
        <Link href="/games">
          <Button>Play More Games</Button>
        </Link>
      </div>
    </>
  );
}
