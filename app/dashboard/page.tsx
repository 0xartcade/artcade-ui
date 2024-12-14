"use client";

// UI Component imports
import { InfoPanel } from "@/components/layout/info-panel"; // Main layout wrapper component
import { GameCard } from "@/components/ui/game-card"; // Card component for displaying game information
import { Button } from "@/components/ui/button"; // Reusable button component
import { TrophyIcon, ArrowRight, GiftIcon, Gamepad2Icon } from "lucide-react"; // Icon imports from Lucide
import Link from "next/link"; // Next.js link component for client-side navigation
import {
  Caption,
  Heading,
  Paragraph,
  SubHeading,
  SubHeading2,
} from "@/components/ui/typography";

//////////////////////////////////////////////////////
/// DASHBOARD PAGE
//////////////////////////////////////////////////////

export default function DashboardPage() {
  // const { isAuthenticated } = useAuth();
  // const [statsView, setStatsView] = useState<"global" | "personal">("global");

  return (
    <InfoPanel>
      <div className="flex flex-col space-y-6 p-4">
        {/* Welcome Section */}
        <div className="flex flex-col items-center text-center space-y-2 mb-4">
          <Heading className="bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
            Welcome to 0xArtcade
          </Heading>
          <Paragraph>
            Your gateway to blockchain-powered gaming experiences.
          </Paragraph>
          <Paragraph className="max-w-lg">
            Play games, earn tickets, climb our on-chain leaderboard, and unlock
            rewards from real artists.
          </Paragraph>
          {/* <Button className="!mt-6">
            Get Started
            <ArrowRightIcon />
          </Button> */}
        </div>

        {/* Stats Section */}
        {/* <div className="max-w-4xl mx-auto w-full space-y-4">
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
              ? STATS.global.map((stat) => (
                  <StatCard key={stat.label} stat={stat} />
                ))
              : STATS.personal.map((stat) => (
                  <StatCard 
                    key={stat.label} 
                    stat={stat} 
                    showConnect={!isAuthenticated} 
                  />
                ))
            }
          </div>
        </div> */}

        {/* Featured Game Section */}
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between mb-4">
            <SubHeading>Featured Game</SubHeading>
            <Link href="/games">
              <Button variant="ghost" size="sm" className="">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <GameCard
            name="Know Your Memes"
            description="Test your knowledge of The Memes by 6529."
            gameType="Art & Knowledge"
            url="/games/1/play"
          />
        </div>

        {/* Quick Actions Section */}
        <div className="max-w-4xl mx-auto w-full">
          <SubHeading className="mb-4">Quick Actions</SubHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/leaderboard">
              <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:bg-zinc-900/70 transition-colors group cursor-pointer">
                <TrophyIcon className="w-6 h-6 text-zinc-400 group-hover:text-white mb-2" />
                <SubHeading2>Leaderboard</SubHeading2>
                <Caption>Check your ranking</Caption>
              </div>
            </Link>
            <Link href="/rewards">
              <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:bg-zinc-900/70 transition-colors group cursor-pointer">
                <GiftIcon className="w-6 h-6 text-zinc-400 group-hover:text-white mb-2" />
                <SubHeading2>Rewards</SubHeading2>
                <Caption>View available rewards</Caption>
              </div>
            </Link>
            <Link href="/games">
              <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50 hover:bg-zinc-900/70 transition-colors group cursor-pointer">
                <Gamepad2Icon className="w-6 h-6 text-zinc-400 group-hover:text-white mb-2" />
                <SubHeading2>Play Now</SubHeading2>
                <Caption>Start gaming</Caption>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </InfoPanel>
  );
}
