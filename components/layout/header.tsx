'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ConnectWalletButton } from "@/components/connect-wallet";
import { UserMenu } from "@/components/user-menu";

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
            0xArtcade
          </Link>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              onClick={(e) => handleNavigation(e, "/games")}
            >
              Play Now
            </Button>
            <Button 
              variant="ghost" 
              onClick={(e) => handleNavigation(e, "/leaderboards")}
            >
              Leaderboard
            </Button>
            <div className="ml-2">
              <ConnectWalletButton />
              <UserMenu />
            </div>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
