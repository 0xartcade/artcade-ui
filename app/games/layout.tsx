'use client';

import { useAuth } from '@/lib/auth-context'; // Authentication context hook
import { ConnectWalletPrompt } from '@/components/ui/connect-wallet'; // Wallet connection prompt component
import { SubNav, type Tab } from '@/components/ui/sub-nav'; // Sub navigation component and types

//////////////////////////////////////////////////////
/// NAVIGATION CONFIG
//////////////////////////////////////////////////////

const NAVIGATION_TABS: Tab[] = [
  { name: 'ArtGuessr', href: '/games', disabled: false },
  { name: 'Coming Soon', href: '/games/coming-soon', disabled: true },
];

//////////////////////////////////////////////////////
/// GAMES LAYOUT
//////////////////////////////////////////////////////

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <SubNav tabs={NAVIGATION_TABS} />
      <div className="flex-1 relative">
        <div className="absolute inset-0 overflow-auto">
          {isAuthenticated ? (
            children
          ) : (
            <ConnectWalletPrompt />
          )}
        </div>
      </div>
    </div>
  );
} 