"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ConnectWalletButton } from "../ui/connect-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Button from "../ui/button";
import {
  Gamepad2Icon,
  LayoutDashboardIcon,
  MenuIcon,
  TicketCheckIcon,
  TicketIcon,
  TrophyIcon,
} from "lucide-react";

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", size: "lg" },
    { href: "/leaderboard", label: "Leaderboard", size: "lg" },
    { href: "/rewards", label: "Rewards", size: "lg" },
    { href: "/games", label: "Play Now", size: "lg" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 bg-background/80 glass-panel border-b border-zinc-800/50 px-4 lg:px-0"
    >
      <div className="container mx-auto py-4">
        <nav className="grid grid-cols-2 lg:grid-cols-3 items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/0xArtcade_Logo.png"
              alt="0xArtcade Logo"
              width={225}
              height={50}
              className="w-48 h-auto"
              priority
            />
          </Link>

          <div className="hidden lg:flex items-center justify-center gap-6">
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className={cn(
                  "group relative font-orbitron text-base uppercase tracking-wider whitespace-nowrap",
                  "transition-all duration-300",
                  isActive(item.href)
                    ? "text-transparent"
                    : "text-white hover:text-white"
                )}
              >
                {isActive(item.href) ? (
                  <span className="bg-gradient-to-r from-artcade-aqua to-artcade-purple bg-clip-text text-transparent">
                    {item.label}
                  </span>
                ) : (
                  <>
                    <span>{item.label}</span>
                    <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-artcade-aqua to-artcade-purple bg-clip-text text-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {item.label}
                    </span>
                  </>
                )}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-artcade-aqua to-artcade-purple"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center justify-end shrink-0">
            <div className="shrink-0">
              <ConnectWalletButton />
            </div>
          </div>

          <div className="lg:hidden ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MenuIcon className="stroke-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/dashboard" className="flex gap-x-2 items-center">
                    <LayoutDashboardIcon />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/leaderboard"
                    className="flex gap-x-2 items-center"
                  >
                    <TrophyIcon />
                    Leaderboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/rewards" className="flex gap-x-2 items-center">
                    <TicketIcon />
                    Rewards
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/games" className="flex gap-x-2 items-center">
                    <Gamepad2Icon />
                    Play Now
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <ConnectWalletButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
