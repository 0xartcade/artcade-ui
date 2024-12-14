"use client";

import { useAuth } from "@/lib/auth-context";
import { ConnectWalletPrompt } from "@/components/ui/connect-wallet";
import { SubNav } from "@/components/ui/sub-nav";
import { InfoPanel } from "@/components/layout/info-panel";

export default function RewardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  const tabs = [
    { name: "Scores", href: "/rewards/scores" },
    { name: "Tickets", href: "/rewards/tickets" },
    { name: "Crates", href: "/rewards/crates" },
    { name: "Vault", href: "/rewards/vault" },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-10rem)]">
      <SubNav tabs={tabs} />
      <InfoPanel className="p-6 h-[calc(100vh-14.5rem)]">
        {isAuthenticated ? children : <ConnectWalletPrompt />}
      </InfoPanel>
    </div>
  );
}
