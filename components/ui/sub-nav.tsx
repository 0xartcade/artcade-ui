import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

//////////////////////////////////////////////////////
/// TYPES
//////////////////////////////////////////////////////

export interface Tab {
  name: string;
  href: string;
  disabled?: boolean;
}

interface SubNavProps {
  tabs: Tab[];
  className?: string;
}

//////////////////////////////////////////////////////
/// SUB NAVIGATION COMPONENT
//////////////////////////////////////////////////////

export function SubNav({ tabs, className }: SubNavProps) {
  const pathname = usePathname();

  return (
    <div className={cn("flex justify-center gap-4 p-4 border-b border-zinc-800", className)}>
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
  );
} 