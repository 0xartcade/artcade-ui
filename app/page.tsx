'use client';

import Link from "next/link";
import Image from "next/image";
import { ShapeCircleIcon } from "@/components/icons/shape-circle";
import { ShapeWordmarkIcon } from "@/components/icons/shape-wordmark";
import { motion } from "framer-motion";

//////////////////////////////////////////////////////
/// HOME PAGE COMPONENT
//////////////////////////////////////////////////////

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-y-4 text-center min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-48 flex flex-col items-center gap-y-12 relative z-10"
      >
        {/* Logo Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-x-4 justify-center"
        >
          {/* Shape Icons Container */}
          <div className="flex items-center gap-x-2 h-9">
            <ShapeCircleIcon className="w-9 h-9" />
            <ShapeWordmarkIcon className="w-28 h-9" />
          </div>
          
          {/* Shapecraft Logo */}
          <div className="h-9">
            <Image
              src="/shapecraftlogo_white.png"
              alt="Shapecraft Logo"
              width={126}
              height={36}
              className="h-full w-auto object-contain"
            />
          </div>
        </motion.div>

        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center text-center space-y-8"
        >
          <div className="relative">
            <div className="font-monoton text-7xl tracking-wider mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-artcade-aqua to-artcade-purple uppercase">
              Welcome to
            </div>
            <div className="font-monoton text-8xl tracking-wider text-center bg-clip-text text-transparent bg-gradient-to-r from-artcade-purple to-artcade-pink uppercase">
              0xArtcade
            </div>
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-artcade-aqua via-artcade-purple to-artcade-pink opacity-20 -z-10" />
          </div>
          <div className="max-w-2xl space-y-4">
            <div className="font-orbitron text-xl text-white uppercase tracking-wider">
              Your gateway to blockchain-powered gaming
            </div>
            <div className="font-system text-zinc-400 text-base uppercase tracking-wider">
              Play games, earn tickets, climb our on-chain leaderboard, and unlock
              rewards from real artists.
            </div>
          </div>
        </motion.div>

        {/* Enter Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Link href="/dashboard">
            <div className="group relative font-system text-xl uppercase tracking-wider overflow-hidden transition-all duration-300 px-8 py-4 rounded-xl border-2 border-artcade-purple/30 bg-zinc-900/40 text-zinc-200 shadow-[0_0_25px_-5px] shadow-artcade-aqua/10">
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-artcade-aqua to-artcade-purple opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
              <div className="absolute -top-1/2 -left-1/2 h-[200%] w-[200%] transition-all duration-300 group-hover:-top-full group-hover:-left-full"
                style={{
                  background: 'linear-gradient(to bottom right, rgba(82, 219, 255, 0.4) 0%, rgba(118, 55, 254, 0.2) 50%, transparent 50%, transparent 100%)',
                  transform: 'rotate(-45deg)',
                }}
              />
              <span className="relative font-orbitron">Enter 0xArtcade</span>
            </div>
          </Link>
        </motion.div>
      </motion.div>

      <Image
        src="/logo.png"
        alt="logo"
        width={1000}
        height={1000}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-full sm:max-w-3xl opacity-[0.08] -z-10"
      />
    </div>
  );
}
