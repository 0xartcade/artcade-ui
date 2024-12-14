"use client";

import { InfoPanel } from "@/components/layout/info-panel";
import Button from "@/components/ui/button";
import {
  Heading,
  Paragraph,
  SubHeading,
  SubHeading2,
} from "@/components/ui/typography";
import { api } from "@/lib/api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { TrophyIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { toast } from "sonner";

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
    <InfoPanel className="text-center">
      <Heading>{game?.name}</Heading>
      <SubHeading>Leaderboard</SubHeading>
      <div className="flex flex-col gap-y-2 bg-secondary w-full h-10 rounded-lg mt-4">
        {entries.map((entry, index) => (
          <div className="flex flex-row gap-x-4" key={entry.token_id}>
            {index === 0 ? (
              <TrophyIcon className="w-5 h-5" />
            ) : (
              <div className="w-5 h-5" />
            )}
            <SubHeading2>{entry.eth_address}</SubHeading2>
            <Paragraph>{entry.score}</Paragraph>
          </div>
        ))}
        {hasNextPage && (
          <Button variant="secondary" onClick={onLoadMoreClick}>
            Load More
          </Button>
        )}
      </div>
    </InfoPanel>
  ) : null;
}
