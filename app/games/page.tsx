"use client";

// UI Component imports
import { Suspense, useCallback, useMemo } from "react"; // React suspense for loading states
import { GameCard } from "@/components/ui/game-card"; // Card component for displaying game information
import { InfoPanel } from "@/components/layout/info-panel"; // Main layout wrapper component
import { withAuth } from "@/lib/auth-context"; // Authentication HOC wrapper
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { SubHeading } from "@/components/ui/typography";
import Button from "@/components/ui/button";

//////////////////////////////////////////////////////
/// LOADING COMPONENTS
//////////////////////////////////////////////////////

// Loading skeleton for game cards
const GameCardSkeleton = () => (
  <div className="w-full h-32 animate-pulse bg-zinc-800 rounded-md" />
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
    <InfoPanel>
      <div className="p-8 max-w-4xl mx-auto space-y-8">
        {/* Introduction Section */}
        <SubHeading>Select a game to play!</SubHeading>

        {/* Games List Section */}
        <div className="space-y-3">
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
              />
            ))}
            {hasNextPage && (
              <Button variant="secondary" onClick={onLoadMoreClick}>
                Load More
              </Button>
            )}
          </Suspense>
        </div>

        {/* Submit Game Section */}
        {/* <Suspense fallback={<ButtonSkeleton />}>
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-8"
            >
              Submit Game Idea
            </Button>
          </div>
        </Suspense> */}
      </div>
    </InfoPanel>
  );
}

export default withAuth(GamesPage);
