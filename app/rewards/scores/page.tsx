"use client";

import { Button } from "@/components/ui/button";
import { GameScore } from "../../../components/ui/game-score";
import { useCallback, useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { SubHeading, Paragraph } from "@/components/ui/typography";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PacmanLoader } from "react-spinners";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
    setSubmissionState("su");
  }

  return (
    <div className="flex flex-col space-y-8">
      {/* Introduction Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center space-y-6"
      >
        <div className="relative">
          <SubHeading className="font-orbitron text-xl text-white uppercase tracking-wider">
            Your Game Scores
          </SubHeading>
          <motion.div 
            layoutId="sectionUnderline"
            className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-artcade-aqua to-artcade-purple"
          />
        </div>
        <div className="max-w-2xl">
          <Paragraph className="artcade-text">
            Submit your scores on-chain to earn tickets and climb the leaderboard.
          </Paragraph>
        </div>
      </motion.div>

      {/* Scores Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {scores.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scores.map((score, index) => (
                <motion.div
                  key={score.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <GameScore
                    gameName={score.game.name}
                    date={score.created_at}
                    score={score.score}
                    isSelected={selectedScores.has(score.id)}
                    onSelect={(checked) => toggleScore(score.id, checked)}
                    gameId={score.game.id}
                  />
                </motion.div>
              ))}
            </div>
            {hasNextPage && (
              <div className="flex justify-center mt-6">
                <Button variant="retro" onClick={onLoadMoreClick}>
                  Load More
                </Button>
              </div>
            )}

            <div className="flex justify-center mt-8">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="retro"
                    size="lg"
                    disabled={selectedScores.size === 0}
                    onClick={submitScore}
                    className="font-orbitron"
                  >
                    Submit Scores Onchain
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/90 backdrop-blur-sm border border-white/10">
                  <DialogHeader>
                    <DialogTitle className="font-orbitron text-lg text-white uppercase tracking-wider">
                      Submit Scores Onchain
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col items-center py-10">
                    <PacmanLoader size={64} color="#cccccc" />
                    <Paragraph className="font-orbitron text-sm text-white mt-4">
                      {submissionState}
                    </Paragraph>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-6 mt-8">
            <Paragraph className="font-orbitron text-sm text-white">
              Looks like you haven&apos;t played any games!
            </Paragraph>
            <Link href="/games">
              <Button variant="retro">Discover Games</Button>
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
