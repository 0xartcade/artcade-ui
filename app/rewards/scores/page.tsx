'use client';

import { Button } from "@/components/ui/button";
import { GameScore } from "../components/game-score";
import { useState } from "react";

// Mock data for example scores
const EXAMPLE_SCORES = [
  { id: 'Game Art 01', date: '2024-03-10', score: 15000, ticketsEarned: 150 },
  { id: 'Game Art 02', date: '2024-03-09', score: 12500, ticketsEarned: 125 },
  { id: 'Game Art 03', date: '2024-03-08', score: 18000, ticketsEarned: 180 },
  { id: 'Game Art 04', date: '2024-03-07', score: 21000, ticketsEarned: 210 },
  { id: 'Game Art 05', date: '2024-03-06', score: 16500, ticketsEarned: 165 },
];

export default function ScoresPage() {
  const [selectedScores, setSelectedScores] = useState<Set<string>>(new Set());

  const toggleScore = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedScores);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedScores(newSelected);
  };

  const handleSignScores = () => {
    // TODO: Implement signing logic
    console.log('Signing scores:', Array.from(selectedScores));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        {EXAMPLE_SCORES.map((score) => (
          <GameScore
            key={score.id}
            gameId={score.id}
            date={score.date}
            score={score.score}
            ticketsEarned={score.ticketsEarned}
            isSelected={selectedScores.has(score.id)}
            onSelect={(checked) => toggleScore(score.id, checked)}
          />
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={handleSignScores}
          disabled={selectedScores.size === 0}
          className="bg-zinc-800 hover:bg-zinc-700 text-white px-8"
        >
          Sign Scorecards
        </Button>
      </div>
    </div>
  );
} 