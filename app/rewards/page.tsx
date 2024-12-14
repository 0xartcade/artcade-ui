"use client";

import { withAuth } from "@/lib/auth-context";
import { Ticket, Package, Vault, ScrollText } from "lucide-react";
import Link from "next/link";

function RewardsPage() {
  return (
    <>
      <div className="p-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/rewards/scores"
            className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-xl"
          >
            <div className="px-12 py-16 bg-zinc-900/50 rounded-xl flex flex-col items-center justify-center gap-4 group-hover:bg-zinc-900/60 transition-colors">
              <ScrollText className="w-12 h-12 text-zinc-400" />
              <h3 className="font-semibold text-lg">Scores</h3>
              <p className="text-zinc-400 text-center">
                See your previous games and submit your scores on-chain to
                receive tickets
              </p>
            </div>
          </Link>
          <Link
            href="/rewards/tickets"
            className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-xl"
          >
            <div className="px-12 py-16 bg-zinc-900/50 rounded-xl flex flex-col items-center justify-center gap-4 group-hover:bg-zinc-900/60 transition-colors">
              <Ticket className="w-12 h-12 text-zinc-400" />
              <h3 className="font-semibold text-lg">Tickets</h3>
              <p className="text-zinc-400 text-center">
                Accumulate tickets and climb our global leaderboard
              </p>
            </div>
          </Link>
          <Link
            href="/rewards/crates"
            className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-xl"
          >
            <div className="px-12 py-16 bg-zinc-900/50 rounded-xl flex flex-col items-center justify-center gap-4 group-hover:bg-zinc-900/60 transition-colors">
              <Package className="w-12 h-12 text-zinc-400" />
              <h3 className="font-semibold text-lg">Crates</h3>
              <p className="text-zinc-400 text-center">
                Redeem your tickets for crates filled with NFTs from your
                favourite artist
              </p>
            </div>
          </Link>
          <Link
            href="/rewards/vault"
            className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-xl"
          >
            <div className="px-12 py-16 bg-zinc-900/50 rounded-xl flex flex-col items-center justify-center gap-4 group-hover:bg-zinc-900/60 transition-colors">
              <Vault className="w-12 h-12 text-zinc-400" />
              <h3 className="font-semibold text-lg">Vault</h3>
              <p className="text-zinc-400 text-center">
                View your collected items including your tickets, crates, and
                revealed art
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default withAuth(RewardsPage);
