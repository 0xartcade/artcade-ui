'use client';

import { InfoPanel } from "@/components/info-panel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { getMockLeaderboardData } from "./utils";
import React from "react";

const ITEMS_PER_PAGE = 7;
const leaderboardData = getMockLeaderboardData();

export default function LeaderboardPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(leaderboardData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = leaderboardData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <InfoPanel>
      <div className="px-32 py-6 space-y-4">
        <div className="flex justify-center border-b border-zinc-800 pb-4">
          <div className="px-4 py-2 rounded-lg bg-zinc-800 text-white">
            Global Leaderboard
          </div>
        </div>

        <div className="grid gap-3">
          {currentData.map((player, index) => (
            <div
              key={player.address}
              className={`p-3 rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm
                ${(startIndex + index) < 3 ? "ring-1 ring-zinc-700" : ""}`}
            >
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <span
                    className={`flex h-10 w-10 text-lg items-center justify-center rounded-full font-bold
                      ${(startIndex + index) === 0 ? "bg-yellow-500/20 text-yellow-500 ring-1 ring-yellow-500/50" : ""}
                      ${(startIndex + index) === 1 ? "bg-zinc-400/20 text-zinc-400 ring-1 ring-zinc-400/50" : ""}
                      ${(startIndex + index) === 2 ? "bg-amber-700/20 text-amber-700 ring-1 ring-amber-700/50" : ""}
                      ${(startIndex + index) > 2 ? "bg-zinc-800/50 text-zinc-500" : ""}`}
                  >
                    {player.rank}
                  </span>
                </div>
                
                <div className="flex-grow flex items-center gap-6">
                  <div className="text-lg font-semibold">{player.name}</div>
                  <div className="font-mono text-sm text-zinc-400">{player.address}</div>
                </div>
                
                <div className="flex-shrink-0 text-right">
                  <div className="text-lg font-bold">{player.tickets.toLocaleString()}</div>
                  <div className="text-xs text-zinc-400">tickets</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-zinc-400">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="ghost"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </InfoPanel>
  );
} 