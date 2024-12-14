"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
// import { ConnectWalletButton } from "@/components/ui/connect-wallet";
// import { UserMenu } from "@/components/ui/user-menu";
// import { TicketStatus } from "@/components/ui/ticket-status";
import { cn } from "@/lib/utils";
import { ConnectWalletButton } from "../ui/connect-button";

export function Header() {
  const pathname = usePathname();

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
          <Link
            href="/dashboard"
            className="text-xl uppercase font-bold bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent"
          >
            0xArtcade
          </Link>

          <div className="flex items-center justify-center gap-4">
            {navItems.map((item) => (
              <Link href={item.href} key={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "text-base font-medium transition-colors",
                    isActive(item.href)
                      ? "text-zinc-100 bg-zinc-800"
                      : "text-zinc-400 hover:text-zinc-100"
                  )}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 shrink-0">
            {/* <div className="shrink-0">
              <TicketStatus />
            </div> */}
            <div className="shrink-0">
              <ConnectWalletButton />
            </div>
            {/* <div className="shrink-0">
              <UserMenu />
            </div> */}
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
