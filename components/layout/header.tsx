'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ConnectWalletButton } from "@/components/ui/connect-wallet";
import { UserMenu } from "@/components/ui/user-menu";
import { TicketStatus } from "@/components/ui/ticket-status";
import { cn } from "@/lib/utils";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    router.push(href);
  };

  const navItems = [
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/rewards", label: "Rewards" },
    { href: "/games", label: "Play Now" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-sm"
    >
      <div className="container mx-auto py-4">
        <nav className="grid grid-cols-3 items-center">
          <Link href="/dashboard" className="text-xl font-bold text-zinc-100">
            0xArtcade
          </Link>

          <div className="flex items-center justify-center gap-4">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                onClick={(e) => handleNavigation(e, item.href)}
                className={cn(
                  "text-base font-medium transition-colors",
                  isActive(item.href)
                    ? "text-zinc-100 bg-zinc-800"
                    : "text-zinc-400 hover:text-zinc-100"
                )}
              >
                {item.label}
              </Button>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 shrink-0">
            <div className="shrink-0">
              <TicketStatus />
            </div>
            <div className="shrink-0">
              <ConnectWalletButton />
            </div>
            <div className="shrink-0">
              <UserMenu />
            </div>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
