'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Footer } from './footer';
import ThreeDPanel from '@/app/3d-panel/page';
import MobilePanel from '@/app/mobile-panel/page';

export function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRootPage = pathname === '/' || pathname === '/dev-logs';

  if (isRootPage) {
    return (
      <div className="flex flex-col min-h-screen">
        {children}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex gap-4 p-4">
        <div className="w-[10%]">
          <ThreeDPanel />
        </div>
        <div className="w-[80%] bg-zinc-900/30 rounded-lg p-4">
          {children}
        </div>
        <div className="w-[10%]">
          <MobilePanel />
        </div>
      </main>
      <Footer />
    </div>
  );
} 