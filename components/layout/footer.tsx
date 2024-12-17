"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TwitterIcon, GithubIcon } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
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

  const footerLinks = [
    { href: "/dev-logs", label: "Dev Logs" },
    // { href: "/submit-game", label: "Submit a Game" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "glass-panel border-t border-zinc-800/50 mt-auto text-center",
        className
      )}
    >
      <div className="container mx-auto py-2">
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <span className="artcade-text">
            © 2024 0xArtcade. All rights reserved.
          </span>

          <div className="flex flex-row items-center gap-6">
            <div className="flex items-center gap-6">
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative font-orbitron text-sm uppercase tracking-wider",
                    "transition-all duration-300",
                    "text-white hover:text-white"
                  )}
                >
                  <span className="relative">
                    {item.label}
                    <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-artcade-aqua to-artcade-purple bg-clip-text text-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {item.label}
                    </span>
                  </span>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group relative p-2 transition-all duration-300",
                    "text-white hover:text-white"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Icon className="w-4 h-4 bg-gradient-to-r from-artcade-aqua to-artcade-purple bg-clip-text text-transparent" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
