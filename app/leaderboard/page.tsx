"use client";

import { InfoPanel } from "@/components/layout/info-panel";
import { Button } from "@/components/ui/button";
import { GameCard } from "@/components/ui/game-card";
import { api } from "@/lib/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import React from "react";
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
    <InfoPanel>
      <div className="w-full px-6 py-6 flex justify-center">
        <div className="w-full flex flex-wrap gap-4">
          {games.map((game) => (
            <GameCard
              key={game.id}
              name={game.name}
              description={game.description}
              gameType="Art & Knowledge"
              url={`/games/${game.id}/leaderboard`}
              ctaName="View Leaderboard"
            />
          ))}
          {games.length < 10 && (
            <GameCard
              name="Coming soon"
              description="We're working on bringing you more games!"
              gameType="?"
            />
          )}
        </div>

        {hasNextPage && (
          <div className="flex justify-center items-center gap-4">
            <Button variant="secondary" onClick={onLoadMoreClick}>
              Load More
            </Button>
          </div>
        )}
      </div>
    </InfoPanel>
  );
}
