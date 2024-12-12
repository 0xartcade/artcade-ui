'use client';

import { useAuth } from '@/lib/auth-context';
import { ConnectWalletPrompt } from '@/components/ui/connect-wallet';
import { ReactNode } from 'react';

//////////////////////////////////////////////////////
/// LAYOUT COMPONENT
//////////////////////////////////////////////////////

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
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