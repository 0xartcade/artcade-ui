'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RewardsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const tabs = [
    { name: 'Scores', href: '/rewards/scores' },
    { name: 'Tickets', href: '/rewards/tickets' },
    { name: 'Crates', href: '/rewards/crates' },
    { name: 'Vault', href: '/rewards/vault' },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex justify-center gap-4 p-4 border-b border-zinc-800">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-2 rounded-lg transition-colors ${
              pathname === tab.href
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </div>
      <div className="flex-1 container mx-auto">
        {children}
      </div>
    </div>
  );
} 