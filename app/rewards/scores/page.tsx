"use client";

import { Button } from "@/components/ui/button";
import { GameScore } from "../../../components/ui/game-score";
import { useCallback, useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { Paragraph } from "@/components/ui/typography";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PacmanLoader } from "react-spinners";

export default function ScoresPage() {
  const [selectedScores, setSelectedScores] = useState<Set<number>>(new Set());
  const [submissionState, setSubmissionState] = useState("Preparing data...");
  const { user } = useAuth();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["scores", user?.username],
    queryFn: async ({ pageParam }) => {
      const response = await api.getScores({ offset: pageParam });
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

  const scores = useMemo(() => {
    return data?.pages?.map((d) => (d ? d.results : [])).flat() || [];
  }, [data]);

  const toggleScore = (id: number, checked: boolean) => {
    const newSelected = new Set(selectedScores);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedScores(newSelected);
  };

  async function submitScore() {
    // get score signatures
    // submit via multi-call
    setSubmissionState("su");
    // success
  }

  return (
    <>
      {scores.length > 0 ? (
        <>
          <div className="space-y-4">
            {scores.map((score) => (
              <GameScore
                key={score.id}
                gameName={score.game.name}
                date={score.created_at}
                score={score.score}
                isSelected={selectedScores.has(score.id)}
                onSelect={(checked) => toggleScore(score.id, checked)}
              />
            ))}
            {hasNextPage && (
              <Button variant="secondary" onClick={onLoadMoreClick}>
                Load More
              </Button>
            )}
          </div>

          <div className="flex justify-center mt-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  disabled={selectedScores.size === 0}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-8"
                  onClick={submitScore}
                >
                  Submit Scores Onchain
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Submit Scores Onchain</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center py-10">
                  <PacmanLoader size={64} color="#cccccc" />
                  <Paragraph>{submissionState}</Paragraph>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </>
      ) : (
        <div>
          <Paragraph>Looks like you haven&apos;t played any games!</Paragraph>
          <Link href="/games">
            <Button>Discover Games</Button>
          </Link>
        </div>
      )}
    </>
  );
}
