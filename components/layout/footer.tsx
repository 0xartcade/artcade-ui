'use client';

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TwitterIcon, GithubIcon, MessageSquareIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Footer() {
  const [showSocials, setShowSocials] = useState(false);

  const socialIcons = [
    { icon: TwitterIcon, href: "#", label: "Twitter" },
    { icon: GithubIcon, href: "#", label: "Github" },
    { icon: MessageSquareIcon, href: "#", label: "Discord" }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-t border-zinc-800 bg-zinc-950/50 backdrop-blur-sm mt-auto"
    >
      <div className="container mx-auto py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-zinc-400 text-sm">© 2024 0xArtcade. All rights reserved.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/dev-logs" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
              Dev Log
            </Link>
            <span className="text-sm text-zinc-400 hover:text-zinc-100 cursor-not-allowed">
              Submit a Game
            </span>
          </div>

          <div className="flex items-center gap-2">
            {socialIcons.map(({ icon: Icon, href, label }) => (
              <Button 
                key={label}
                variant="ghost" 
                size="icon"
                asChild
              >
                <Link href={href}>
                  <Icon className="w-5 h-5 text-zinc-400 hover:text-zinc-100 transition-colors" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
