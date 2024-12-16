"use client";

import { Button } from "@/components/ui/button";
import { GameCard } from "@/components/ui/game-card";
import { SubHeading, Paragraph } from "@/components/ui/typography";
import { api } from "@/lib/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

//////////////////////////////////////////////////////
/// LEADERBOARD PAGE
//////////////////////////////////////////////////////

export default function LeaderboardPage() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["games"],
    queryFn: async ({ pageParam }) => {
      const response = await api.getGames({ offset: pageParam });
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

  const games = useMemo(() => {
    return data?.pages?.map((d) => (d ? d.results : [])).flat() || [];
  }, [data]);

  return (
    <div className="page-layout">
      <div className="page-layout-inner">
        {/* Page Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="relative">
            <SubHeading className="font-orbitron text-xl text-white uppercase tracking-widest">
              Game Leaderboards
            </SubHeading>
            <motion.div
              layoutId="sectionUnderline"
              className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-artcade-aqua to-artcade-purple"
            />
          </div>
          <div className="max-w-2xl">
            <Paragraph className="artcade-text">
              Check your ranking and compete with other players across all our
              games.
            </Paragraph>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex flex-col space-y-12 max-w-4xl mx-auto">
          {/* Games List Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full space-y-6"
          >
            {games.map((game) => (
              <GameCard
                key={game.id}
                name={game.name}
                description={game.description}
                gameType="Art"
                url={`/leaderboard/${game.id}`}
                ctaName="View"
                thumbnail={
                  game.id === 1 ? "/games/thumbnail_game01.jpg" : undefined
                }
              />
            ))}

            {hasNextPage && (
              <div className="flex justify-center mt-6">
                <Button variant="retro" onClick={onLoadMoreClick}>
                  Load More
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
