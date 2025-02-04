"use client";

import Button from "@/components/ui/button";
import { Heading, Paragraph } from "@/components/ui/typography";
import { api } from "@/lib/api";
import { GameplayResult } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Summary({
  gameplayId,
  nextStep,
}: {
  gameplayId: number;
  nextStep: () => void;
}) {
  const [result, setResult] = useState<GameplayResult | null>(null);

  async function getResult() {
    const r = await api.submitKYMGameplay(gameplayId);

    if (!r.success) {
      toast.error(r.error);
      return;
    }

    setResult(r.data);
  }

  useEffect(() => {
    if (!result) {
      getResult();
    }
  }, []);

  function getScorePhrase(score: number): string {
    if (score === 0) {
      return "*Sad Trumpet Noise*";
    } else if (score > 0 && score <= 4000) {
      return "Alright Alright Alright Alright";
    } else if (score > 4000 && score <= 10000) {
      return "Well Done!";
    } else if (score > 10000 && score < 20000) {
      return "Wow!";
    } else {
      return "Holy Shit!";
    }
  }

  return result ? (
    <div className="w-full flex flex-col gap-y-8 items-center">
      <Paragraph className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-title bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent !mt-0">
        Total Score: {result.total_score}
      </Paragraph>
      <Heading>{getScorePhrase(result.total_score)}</Heading>
      <div className="flex flex-col-reverse md:flex-row gap-4">
        <Link href="/rewards/scores">
          <Button variant="secondary">VIEW ALL SCORES</Button>
        </Link>
        <Button variant="retro" onClick={nextStep}>
          Play Again
        </Button>
      </div>
    </div>
  ) : null;
}
