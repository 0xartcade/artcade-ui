"use client";

import { Suspense, useCallback, useMemo } from "react";
import { GameCard } from "@/components/ui/game-card";
import { withAuth } from "@/lib/auth-context";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { SubHeading, Paragraph } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

//////////////////////////////////////////////////////
/// LOADING COMPONENTS
//////////////////////////////////////////////////////

const GameCardSkeleton = () => (
  <div className="w-full h-32 animate-pulse bg-black/40 backdrop-blur-sm rounded-2xl border border-white/5" />
);

//////////////////////////////////////////////////////
/// GAMES PAGE
//////////////////////////////////////////////////////

function GamesPage() {
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
              Select a game to play!
            </SubHeading>
            <motion.div 
              layoutId="sectionUnderline"
              className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-artcade-aqua to-artcade-purple"
            />
          </div>
          <div className="max-w-2xl">
            <Paragraph className="artcade-text">
              Choose from our collection of blockchain-powered games and start earning rewards.
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
            className="w-full space-y-8"
          >
            <Suspense
              fallback={
                <>
                  <GameCardSkeleton />
                  <GameCardSkeleton />
                  <GameCardSkeleton />
                </>
              }
            >
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  name={game.name}
                  description={game.description}
                  gameType="Art"
                  url={`/games/${game.id}/play`}
                  thumbnail={game.id === 1 ? "/games/thumbnail_game01.jpg" : undefined}
                />
              ))}
              <GameCard
                name="Click to Create"
                description="Test your knowledge of Click Create's curated collection. Identify artists, curators, mint dates, and themes from their unique digital art pieces."
                gameType="Art"
              />
              <GameCard
                name="SuperSales"
                description="SuperRare is one of the oldest and most prestigious curators of digital art. Test your knowledge of the biggest sales on the platform."
                gameType="Art"
              />
              {hasNextPage && (
                <div className="flex justify-center mt-6">
                  <Button variant="retro" onClick={onLoadMoreClick}>
                    Load More
                  </Button>
                </div>
              )}
            </Suspense>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(GamesPage);
