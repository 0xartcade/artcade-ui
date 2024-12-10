'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/games", label: "Games" },
  { href: "/rewards", label: "Rewards" },
  { href: "/leaderboards", label: "Leaderboards" },
];

export function Header() {
  const router = useRouter();

  const handleNavigation = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-sm"
    >
      <div className="container mx-auto py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-zinc-100">
            Artcade
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button 
                key={item.href} 
                variant="ghost" 
                onClick={(e) => handleNavigation(e, item.href)}
              >
                {item.label}
              </Button>
            ))}
          </div>

          <Button variant="outline" className="border-zinc-800">
            Connect Wallet
          </Button>
        </nav>
      </div>
    </motion.header>
  );
}
