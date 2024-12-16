"use client";

import { SubNav } from "@/components/ui/sub-nav";

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = [
    { name: "Games", href: "/leaderboard" },
    { name: "Global (Coming Soon)", href: "#", disabled: true },
  ];

  return (
    <>
      <SubNav tabs={tabs} className="shadow-[0_0_25px_-5px] shadow-zinc-950 mb-4" />
      <div className="page-container p-6">
        {children}
      </div>
    </>
  );
} 