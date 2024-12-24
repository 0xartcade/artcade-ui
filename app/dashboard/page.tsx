"use client";

import { GameCard } from "@/components/ui/game-card";
import { TrophyIcon, ArrowRight, GiftIcon, Gamepad2Icon } from "lucide-react";
import Link from "next/link";
import { SubHeading } from "@/components/ui/typography";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";

//////////////////////////////////////////////////////
/// DASHBOARD PAGE
//////////////////////////////////////////////////////

/* Container background colors from our palette */
const gradientPairs = [
  { from: "#52DBFF", to: "#7637FE" }, // aqua to purple
  { from: "#7637FE", to: "#FF3DDC" }, // purple to pink
  { from: "#FF3DDC", to: "#FF3D5D" }, // pink to tangerine
];

// Muted versions of the same colors for text
const textGradientPairs = [
  { from: "rgba(255, 255, 255, 0.95)", to: "rgba(255, 255, 255, 0.8)" },
  { from: "rgba(255, 255, 255, 0.95)", to: "rgba(255, 255, 255, 0.8)" },
  { from: "rgba(255, 255, 255, 0.95)", to: "rgba(255, 255, 255, 0.8)" },
];

function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const { data: featuredGame } = useQuery({
    queryKey: ["game", 1],
    queryFn: async () => {
      const response = await api.getGame(1);
      if (!response.success) {
        toast.error(response.error);
        throw new Error(response.error);
      }
      return response.data;
    },
  });

  return (
    <div className="page-layout">
      <div className="page-layout-inner">
        {/* Page Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
        </div>

        {/* Page Content */}
        <div className="flex flex-col space-y-12 max-w-4xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <div className="artcade-container-vertical group relative">
              <div className="artcade-hover-gradient" />
              <div className="artcade-hover-sweep" />
              <div className="bg-zinc-900 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
                <div className="flex flex-col items-center text-center gap-8 p-8">
                  {/* Main Welcome Text */}
                  <div className="max-w-2xl">
                    <SubHeading className="font-orbitron text-2xl bg-gradient-to-r from-artcade-aqua via-artcade-purple to-artcade-pink bg-clip-text text-transparent uppercase tracking-wider mb-4">
                      Welcome to 0xArtcade
                    </SubHeading>
                    <p className="text-zinc-300 text-lg leading-relaxed">
                      Play art-focused games, climb leadboards, earn rewards and exchange for NFTs and other rewards.
                    </p>
                  </div>

                  {/* How It Works Steps */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {[
                      {
                        title: "Choose Game",
                        description: "Browse art-focused games, each testing different aspects of your Web3 knowledge.",
                        gradient: "from-artcade-aqua to-artcade-purple"
                      },
                      {
                        title: "Play & Score",
                        description: "Play the game, submit your score, and climb the on-chain leaderboards.",
                        gradient: "from-artcade-purple to-artcade-pink"
                      },
                      {
                        title: "Claim Rewards",
                        description: "Claim tickets, exchange for crates, and unlock exclusive NFTs and rewards.",
                        gradient: "from-artcade-pink to-artcade-aqua"
                      }
                    ].map((step, index) => (
                      <div key={step.title} className="flex flex-col items-center text-center p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-artcade-aqua to-artcade-purple flex items-center justify-center mb-4">
                          <span className="font-orbitron text-lg text-white">
                            {index + 1}
                          </span>
                        </div>
                        <h3 className={`font-orbitron text-lg uppercase tracking-wider bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent mb-2`}>
                          {step.title}
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Featured Game Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="relative">
                <SubHeading className="font-orbitron text-xl text-white uppercase tracking-widest">
                  Featured Game
                </SubHeading>
                <motion.div
                  layoutId="sectionUnderline"
                  className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-artcade-aqua to-artcade-purple"
                />
              </div>
              <Link href="/games">
                <div className="group relative font-orbitron text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 px-3 py-1.5 rounded-sm border-2 border-artcade-purple/30 bg-zinc-900/40 text-zinc-200 shadow-[0_0_15px_-3px] shadow-artcade-aqua/10">
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-artcade-aqua to-artcade-purple opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
                  <div
                    className="absolute -top-1/2 -left-1/2 h-[200%] w-[200%] transition-all duration-300 group-hover:-top-full group-hover:-left-full"
                    style={{
                      background:
                        "linear-gradient(to bottom right, rgba(82, 219, 255, 0.4) 0%, rgba(118, 55, 254, 0.2) 50%, transparent 50%, transparent 100%)",
                      transform: "rotate(-45deg)",
                    }}
                  />
                  <span className="relative">View All</span>
                  <ArrowRight className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
            {featuredGame && (
              <GameCard
                name={featuredGame.name}
                description={featuredGame.description}
                gameType="Art"
                url={isAuthenticated ? `/games/${featuredGame.id}/play` : undefined}
                thumbnail="/games/thumbnail_game01.jpg"
                requiresAuth={!isAuthenticated}
              />
            )}
          </motion.div>

          {/* Quick Actions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full"
          >
            <div className="relative mb-6">
              <SubHeading className="font-orbitron text-xl text-white uppercase tracking-widest">
                Quick Actions
              </SubHeading>
              <motion.div
                layoutId="sectionUnderline2"
                className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-artcade-aqua to-artcade-purple"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  href: "/leaderboard",
                  icon: TrophyIcon,
                  title: "Leaderboard",
                  caption: "Check your ranking"
                },
                {
                  href: "/rewards",
                  icon: GiftIcon,
                  title: "Rewards",
                  caption: "View rewards"
                },
                {
                  href: "/games",
                  icon: Gamepad2Icon,
                  title: "Play Now",
                  caption: "Start gaming"
                },
              ].map((action, index) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-2xl"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="artcade-container-vertical relative flex flex-col items-center justify-center min-h-[200px] p-4"
                  >
                    <div className="artcade-hover-gradient" />
                    <div className="artcade-hover-sweep" />
                    <div className="absolute inset-3 bg-zinc-900 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
                      <div className="flex flex-col items-center justify-center h-full w-full p-3 gap-3">
                        <action.icon
                          className="w-12 h-12 transition-all duration-300"
                          style={{
                            stroke: `url(#icon-gradient-${index})`,
                            fill: "none",
                            strokeWidth: 1.5,
                          }}
                        />
                        <svg width="0" height="0">
                          <linearGradient
                            id={`icon-gradient-${index}`}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop
                              stopColor={gradientPairs[index].from}
                              offset="0%"
                            />
                            <stop
                              stopColor={gradientPairs[index].to}
                              offset="100%"
                            />
                          </linearGradient>
                        </svg>
                        <h3
                          className="font-orbitron text-2xl uppercase text-transparent bg-clip-text bg-gradient-to-r"
                          style={{
                            backgroundImage: `linear-gradient(to right, ${textGradientPairs[index].from}, ${textGradientPairs[index].to})`,
                          }}
                        >
                          {action.title}
                        </h3>
                        <p className="text-sm text-zinc-400 uppercase tracking-wider text-center">
                          {action.caption}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
