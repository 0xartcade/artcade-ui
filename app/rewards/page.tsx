"use client";

import { withAuth } from "@/lib/auth-context";
import { Ticket, Package, Vault, ScrollText } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SubHeading, Paragraph } from "@/components/ui/typography";

function RewardsPage() {
  const gradientPairs = [
    { from: "#52DBFF", to: "#7637FE" }, // aqua to purple
    { from: "#7637FE", to: "#FF3DDC" }, // purple to pink
    { from: "#FF3DDC", to: "#FF3D5D" }, // pink to tangerine
    { from: "#52DBFF", to: "#FF3D5D" }, // aqua to tangerine
  ];

  // Muted versions of the same colors for text
  const textGradientPairs = [
    { from: "rgba(255, 255, 255, 0.95)", to: "rgba(255, 255, 255, 0.8)" },
    { from: "rgba(255, 255, 255, 0.95)", to: "rgba(255, 255, 255, 0.8)" },
    { from: "rgba(255, 255, 255, 0.95)", to: "rgba(255, 255, 255, 0.8)" },
    { from: "rgba(255, 255, 255, 0.95)", to: "rgba(255, 255, 255, 0.8)" },
  ];

  const rewardSections = [
    {
      href: "/rewards/scores",
      icon: ScrollText,
      title: "Scores",
      description:
        "See and submit your previous scores on-chain to receive tickets",
    },
    {
      href: "/rewards/tickets",
      icon: Ticket,
      title: "Tickets",
      description: "Accumulate tickets and climb our global leaderboard",
    },
    // {
    //   href: "/rewards/crates",
    //   icon: Package,
    //   title: "Crates",
    //   description:
    //     "Redeem your tickets for crates filled with NFTs from your favourite artist",
    // },
    // {
    //   href: "/rewards/vault",
    //   icon: Vault,
    //   title: "Vault",
    //   description:
    //     "View your collected items including your tickets, crates, and revealed art",
    // },
  ];

  return (
    <div className="page-layout">
      <div className="page-layout-inner">
        {/* Page Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="relative">
            <SubHeading className="font-orbitron text-xl text-white uppercase tracking-widest">
              Rewards Center
            </SubHeading>
            <motion.div
              layoutId="sectionUnderline"
              className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-artcade-aqua to-artcade-purple"
            />
          </div>
          <div className="max-w-2xl">
            <Paragraph className="">
              Track your progress, manage your rewards, and unlock exclusive
              NFTs.
            </Paragraph>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex flex-col space-y-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rewardSections.map((section, index) => (
              <Link
                key={section.href}
                href={section.href}
                className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-2xl"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="artcade-container-vertical relative flex flex-col items-center justify-center min-h-[280px] p-6"
                >
                  <div className="artcade-hover-gradient" />
                  <div className="artcade-hover-sweep" />
                  <div className="absolute inset-3 bg-zinc-900 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
                    <div className="flex flex-col items-center justify-center h-full w-full p-6 gap-4">
                      <section.icon
                        className="w-20 h-20 transition-all duration-300"
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
                        className="font-orbitron text-3xl uppercase text-transparent bg-clip-text bg-gradient-to-r tracking-[0.2em]"
                        style={{
                          backgroundImage: `linear-gradient(to right, ${textGradientPairs[index].from}, ${textGradientPairs[index].to})`,
                        }}
                      >
                        {section.title}
                      </h3>
                      <p className=" text-sm text-zinc-400 uppercase tracking-wider text-center">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(RewardsPage);
