'use client';

import { Suspense } from 'react';
import { GameCard } from "@/components/ui/game-card";
import { Button } from "@/components/ui/button";
import { InfoPanel } from "@/components/ui/info-panel";
import { withAuth } from '@/lib/auth-context';

const EXAMPLE_GAMES = [
  {
    id: '1',
    name: 'Know Your Memes',
    description: 'How well do you know "The Memes" by 6529 Collections? You\'ll be shown 5 random tokens from the collection and asked to guess their title, season, number of tokens, and the the artist name.',
    gameType: 'ArtGuessr',
    collaborator: '6529 Collections'
  },
  {
    id: '2',
    name: 'Click to Create',
    description: 'Test your knowledge of Click Create\'s curated collection. Identify artists, curators, mint dates, and themes from their unique digital art pieces.',
    gameType: 'ArtGuessr',
    collaborator: 'Click Create'
  },
  {
    id: '3',
    name: 'SuperSales',
    description: 'SuperRare is one of the oldest and most prestigious curators of digital art. You\'ll be shown a random token from the SuperRare contact that sold for > than 1 ETH. Guess the artist name, sale price, sale date, and the name of the collector that purchased it.',
    gameType: 'ArtGuessr',
    collaborator: 'SuperRare'
  }
];

// Loading components
const IntroductionSkeleton = () => (
  <div className="w-full h-20 animate-pulse bg-zinc-800 rounded-md" />
);

const GameCardSkeleton = () => (
  <div className="w-full h-32 animate-pulse bg-zinc-800 rounded-md" />
);

const ButtonSkeleton = () => (
  <div className="w-32 h-10 animate-pulse bg-zinc-800 rounded-md mx-auto" />
);

function GamesPage() {
  return (
    <InfoPanel>
      <div className="p-8 max-w-4xl mx-auto space-y-8">
        {/* Introduction with Suspense */}
        <Suspense fallback={<IntroductionSkeleton />}>
          <p className="text-zinc-400 text-lg text-center">
            ArtGuessr is a 5 round trivia game that challenges you to guess key metadata from a random piece of art. Each game below is based on different set of NFTs with different guessing criteria.
          </p>
        </Suspense>

        {/* Games Stack with Suspense */}
        <div className="space-y-3">
          <Suspense fallback={
            <>
              <GameCardSkeleton />
              <GameCardSkeleton />
              <GameCardSkeleton />
            </>
          }>
            {EXAMPLE_GAMES.map((game) => (
              <GameCard
                key={game.id}
                name={game.name}
                description={game.description}
                gameType={game.gameType}
                collaborator={game.collaborator}
              />
            ))}
          </Suspense>
        </div>

        {/* Submit Game Button with Suspense */}
        <Suspense fallback={<ButtonSkeleton />}>
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-8"
            >
              Submit Game Idea 
            </Button>
          </div>
        </Suspense>
      </div>
    </InfoPanel>
  );
}

export default withAuth(GamesPage);
