'use client';

import { InfoPanel } from "@/components/ui/info-panel";
import { GameCard } from "@/components/ui/game-card";
import { Button } from "@/components/ui/button";
import { Gamepad2, Trophy, Ticket, Gift, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ConnectWalletButton } from "@/components/ui/connect-wallet";
import { useAuth } from "@/lib/auth-context";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const [statsView, setStatsView] = useState<'global' | 'personal'>('global');

  const stats = {
    global: [
      { label: "Games Played", value: "69", icon: Gamepad2 },
      { label: "Points Scored", value: "1.2M", icon: Trophy },
      { label: "Tickets Earned", value: "856", icon: Ticket },
      { label: "Rewards Unlocked", value: "42", icon: Gift },
    ],
    personal: [
      { label: "Games Played", value: "0", icon: Gamepad2 },
      { label: "Points Scored", value: "0", icon: Trophy },
      { label: "Tickets Earned", value: "0", icon: Ticket },
      { label: "Rewards Unlocked", value: "0", icon: Gift },
    ],
  };

  const StatCard = ({ stat, showConnect = false }: { stat: typeof stats.global[0], showConnect?: boolean }) => (
    <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50">
      <div className="flex flex-col items-center justify-center min-h-[140px]">
        <stat.icon className="w-6 h-6 text-zinc-400 mb-2" />
        <div className="h-9 flex items-center justify-center">
          {showConnect ? (
            <div className="scale-75">
              <ConnectWalletButton />
            </div>
          ) : (
            <span className="text-2xl font-semibold">{stat.value}</span>
          )}
        </div>
        <span className="text-sm font-medium mt-2">{stat.label}</span>
      </div>
    </div>
  );

  return (
    <InfoPanel>
      <div className="flex flex-col space-y-6 p-4">
        <div className="flex flex-col items-center text-center space-y-2 mb-4">
          <h2 className="text-2xl font-semibold">Welcome to 0xArtcade</h2>
          <p className="text-zinc-400 max-w-lg">
          Your gateway to blockchain-powered gaming experiences. 
          </p>
          <p className="text-zinc-400 max-w-lg">
          Play games, earn tickets, climb our on-chain leaderboard, and unlock rewards from real artists.
          </p>
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto w-full space-y-4">
          <div className="flex justify-end mb-2">
            <div className="inline-flex p-0.5 bg-zinc-900/50 rounded-lg text-xs">
              <button
                onClick={() => setStatsView('personal')}
                className={cn(
                  "px-2 py-0.5 rounded-md transition-colors",
                  statsView === 'personal' 
                    ? "bg-zinc-800 text-white" 
                    : "text-zinc-400 hover:text-white"
                )}
              >
                Player
              </button>
              <button
                onClick={() => setStatsView('global')}
                className={cn(
                  "px-2 py-0.5 rounded-md transition-colors",
                  statsView === 'global' 
                    ? "bg-zinc-800 text-white" 
                    : "text-zinc-400 hover:text-white"
                )}
              >
                Global
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {statsView === 'global' 
              ? stats.global.map((stat) => (
                  <StatCard key={stat.label} stat={stat} />
                ))
              : stats.personal.map((stat) => (
                  <StatCard 
                    key={stat.label} 
                    stat={stat} 
                    showConnect={!isAuthenticated} 
                  />
                ))
            }
          </div>
        </div>

        {/* Featured Game */}
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Featured Game</h3>
            <Link href="/games">
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <GameCard
            name="ArtGuessr"
            description="Test your knowledge of art history and earn rewards by guessing the correct artists and periods."
            gameType="Art & Knowledge"
          />
        </div>

        {/* Quick Actions */}
        <div className="max-w-4xl mx-auto w-full">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/leaderboard">
              <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:bg-zinc-900/70 transition-colors group cursor-pointer">
                <Trophy className="w-6 h-6 text-zinc-400 group-hover:text-white mb-2" />
                <h4 className="font-medium">Leaderboard</h4>
                <p className="text-sm text-zinc-400">Check your ranking</p>
              </div>
            </Link>
            <Link href="/rewards">
              <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:bg-zinc-900/70 transition-colors group cursor-pointer">
                <Gift className="w-6 h-6 text-zinc-400 group-hover:text-white mb-2" />
                <h4 className="font-medium">Rewards</h4>
                <p className="text-sm text-zinc-400">View available rewards</p>
              </div>
            </Link>
            <Link href="/games">
              <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:bg-zinc-900/70 transition-colors group cursor-pointer">
                <Gamepad2 className="w-6 h-6 text-zinc-400 group-hover:text-white mb-2" />
                <h4 className="font-medium">Play Now</h4>
                <p className="text-sm text-zinc-400">Start gaming</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </InfoPanel>
  );
}
