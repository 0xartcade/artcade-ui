"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TwitterIcon, GithubIcon } from "lucide-react";
import Link from "next/link";
import { Caption } from "../ui/typography";

export function Footer() {
  const socialIcons = [
    {
      icon: TwitterIcon,
      href: "https://x.com/0xArtcade",
      label: "Twitter",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      icon: GithubIcon,
      href: "https://github.com/0xArtcade",
      label: "Github",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-t border-zinc-800 bg-zinc-950/50 backdrop-blur-sm mt-auto"
    >
      <div className="container mx-auto py-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Caption>© 2024 0xArtcade. All rights reserved.</Caption>

          <div className="flex flex-row items-center gap-4">
            <div className="flex items-center gap-6">
              <Link href="/dev-logs">
                <Caption className="hover:text-foreground transition-colors">
                  Dev Logs
                </Caption>
              </Link>
              {/* <span className="text-sm text-zinc-400 hover:text-zinc-100 cursor-not-allowed">
                Submit a Game
              </span> */}
            </div>

            <div className="flex items-center">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <Button key={label} variant="ghost" size="icon" asChild>
                  <Link href={href}>
                    <Icon className="w-5 h-5 hover:stroke-foreground transition-colors" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
