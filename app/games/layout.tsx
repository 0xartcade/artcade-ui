"use client";

import { SubNav } from "@/components/ui/sub-nav";

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = [{ name: "All Games", href: "/games" }];

  return (
    <>
      <SubNav tabs={tabs} className="mb-4" />
      <div className="page-layout">
        <div className="page-layout-inner">{children}</div>
      </div>
    </>
  );
}
