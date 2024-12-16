import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
    <div className="flex justify-center w-full">
      <div
        className={cn(
          "inline-flex justify-center gap-4 px-12 py-4 rounded-2xl",
          "bg-black/40 backdrop-blur-sm",
          className
        )}
      >
        {tabs.map((tab, index) => {
          if (tab.disabled) {
            return (
              <div
                key={tab.href}
                className="px-4 py-2  text-sm uppercase tracking-wider text-zinc-600 cursor-not-allowed"
              >
                {tab.name}
              </div>
            );
          }

          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "group relative px-4 py-2  text-sm uppercase tracking-wider transition-colors",
                isActive ? "text-white" : "text-zinc-400 hover:text-white"
              )}
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.1,
                  ease: [0, 0.2, 0.4, 1],
                }}
              >
                {tab.name}
              </motion.span>
              {isActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-artcade-aqua to-artcade-purple"
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
