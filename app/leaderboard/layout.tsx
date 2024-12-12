'use client';

import { SubNav } from '@/components/ui/sub-nav';

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = [
    { name: 'Global', href: '/leaderboard' },
    ...Array.from({ length: 8 }, (_, i) => ({
      name: `Game ${String(i + 1).padStart(2, '0')}`,
      href: `/leaderboard/game-${String(i + 1).padStart(2, '0')}`
    }))
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <SubNav tabs={tabs} />
      <div className="flex-1 container mx-auto">
        {children}
      </div>
    </div>
  );
} 