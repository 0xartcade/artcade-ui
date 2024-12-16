"use client";

import { Button } from "@/components/ui/button";
import { Heading, SubHeading } from "@/components/ui/typography";
import { api } from "@/lib/api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { TrophyIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

//////////////////////////////////////////////////////
/// GAME LEADERBOARD PAGE
//////////////////////////////////////////////////////

export default function GameLeaderboardPage() {
  const { gameId } = useParams<{ gameId: string }>();

  const { data: game } = useQuery({
    queryKey: ["game", gameId],
    queryFn: async () => {
      const response = await api.getGame(parseInt(gameId, 10));
      if (!response.success) {
        toast.error(response.error);
        throw new Error(response.error);
      }
      return response.data;
    },
  });

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["leaderboard", gameId],
    queryFn: async ({ pageParam }) => {
      const response = await api.getLeaderboard(parseInt(gameId, 10), {
        offset: pageParam,
      });
      if (!response.success) {
        toast.error(response.error);
        throw new Error(response.error);
      }
      return response.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      lastPage?.next ? pages.length : undefined,
  });

  const onLoadMoreClick = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const entries = useMemo(() => {
    return data?.pages?.map((d) => (d ? d.results : [])).flat() || [];
  }, [data]);

  return game ? (
    <div className="page-layout">
      <div className="page-layout-inner">
        {/* Page Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="relative">
            <Heading className="font-orbitron text-xl text-white uppercase tracking-widest">
              {game?.name}
            </Heading>
            <motion.div
              layoutId="sectionUnderline"
              className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-artcade-aqua to-artcade-purple"
            />
          </div>
          <SubHeading>Leaderboard</SubHeading>
        </div>

        {/* Page Content */}
        <div className="flex flex-col space-y-12 max-w-4xl mx-auto">
          <div className="flex flex-col gap-y-4">
            {entries.map((entry, index) => (
              <div
                key={entry.token_id}
                className="artcade-container-horizontal group relative h-20"
              >
                <div className="artcade-hover-gradient" />
                <div className="artcade-hover-sweep" />
                <div className="absolute inset-3 bg-zinc-900 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
                  <div className="flex items-center h-full px-6">
                    {/* Rank */}
                    <div className="flex items-center gap-4 w-24">
                      <span className="font-orbitron text-2xl text-white">
                        {index + 1}
                      </span>
                      {index === 0 && (
                        <TrophyIcon className="w-6 h-6 text-yellow-500" />
                      )}
                    </div>

                    {/* Address */}
                    <div className="flex-1">
                      <span className="font-orbitron text-lg text-white">
                        {entry.eth_address}
                      </span>
                    </div>

                    {/* Score */}
                    <div className="w-48 text-right">
                      <span className="font-orbitron text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        {entry.score.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {hasNextPage && (
              <div className="flex justify-center mt-6">
                <Button variant="retro" onClick={onLoadMoreClick}>
                  Load More
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
