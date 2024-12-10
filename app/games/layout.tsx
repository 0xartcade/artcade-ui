'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const tabs = [
    { name: 'ArtGuessr', href: '/games', disabled: false },
    { name: 'Coming Soon', href: '/games/coming-soon', disabled: true },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex justify-center gap-4 p-4 border-b border-zinc-800">
        {tabs.map((tab) => {
          if (tab.disabled) {
            return (
              <div
                key={tab.href}
                className="px-4 py-2 rounded-lg text-zinc-600 cursor-not-allowed"
              >
                {tab.name}
              </div>
            );
          }

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "px-4 py-2 rounded-lg transition-colors",
                pathname === tab.href
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
      <div className="flex-1 container mx-auto">
        {children}
      </div>
    </div>
  );
} 