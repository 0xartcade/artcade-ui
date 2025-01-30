"use client";

import Button from "@/components/ui/button";
import { Paragraph, SubHeading } from "@/components/ui/typography";
import Image from "next/image";

export default function Start({ nextStep }: { nextStep: () => void }) {
  return (
    <div className="w-full flex flex-col items-center gap-y-8 mb-8">
      <Image
        src="/games/thumbnail_game01.jpg"
        width="600"
        height="600"
        alt="kym"
        className="w-[500px] max-w-full rounded-xl border"
      />
      <SubHeading>How To Play</SubHeading>
      <div className="text-center">
        <Paragraph className="max-w-lg">
          There are 5 rounds of questions. In each question, you will be shown a
          6529 meme and have to guess the artist, title, season, and supply of
          the meme.
        </Paragraph>
        <Paragraph className="max-w-lg">
          Points are awarded based on number correct and how fast you submit.
          Good luck!
        </Paragraph>
      </div>
      <Button variant="retro" onClick={nextStep}>
        Start
      </Button>
    </div>
  );
}
