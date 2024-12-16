"use client";

import { useAuth } from "@/lib/auth-context";
import { ConnectWalletPrompt } from "@/components/ui/connect-wallet";
import { SubNav } from "@/components/ui/sub-nav";

export default function RewardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  const tabs = [
    { name: "Reward Center", href: "/rewards" },
    { name: "Scores", href: "/rewards/scores" },
    { name: "Tickets", href: "/rewards/tickets" },
    { name: "Crates", href: "/rewards/crates" },
    { name: "Vault", href: "/rewards/vault" },
  ];

  return (
    <>
      <SubNav tabs={tabs} className="shadow-[0_0_25px_-5px] shadow-zinc-950 mb-4" />
      <div className="page-layout">
        <div className="page-layout-inner">
          {isAuthenticated ? children : <ConnectWalletPrompt />}
        </div>
      </div>
    </>
  );
}
