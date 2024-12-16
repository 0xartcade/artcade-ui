"use client";

import { SubNav } from "@/components/ui/sub-nav";

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = [
    { name: "ArtGuessr", href: "/games" },
    { name: "Coming Soon", href: "#", disabled: true },
  ];

  return (
    <>
      <SubNav tabs={tabs} className="shadow-[0_0_25px_-5px] shadow-zinc-950 mb-4" />
      <div className="page-layout">
        <div className="page-layout-inner">
          {children}
        </div>
      </div>
    </>
  );
} 