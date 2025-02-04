"use client";

import { SubNav } from "@/components/ui/sub-nav";

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = [
    { name: "Game Leaderboards", href: "/leaderboard" },
    { name: "Global (Coming Soon)", href: "#", disabled: true },
  ];

  return (
    <>
      <SubNav
        tabs={tabs}
        className="mb-4"
      />
      <div className="page-container p-6">{children}</div>
    </>
  );
}
