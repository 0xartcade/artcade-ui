"use client";

import Button from "@/components/ui/button";
import { Heading, Paragraph, Title } from "@/components/ui/typography";
import { api } from "@/lib/api";
import { Answer, Question, RevealedQuestion } from "@/lib/types";
import { CheckIcon, CircleCheckIcon, CircleXIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function Play({
  gameplayId,
  questionNumber,
  nextStep,
}: {
  gameplayId: number;
  questionNumber: number;
  nextStep: () => void;
}) {
  const [countdown, setCountdown] = useState(30);
  const [q, setQ] = useState<Question | null>(null);
  const [a, setA] = useState<Answer>({
    title: null,
    artist: null,
    season: null,
    supply: null,
  });
  const [rq, setRq] = useState<RevealedQuestion | null>(null);

  async function getQuestion() {
    const r = await api.getKYMQuestion(gameplayId);
    if (!r.success) {
      toast.error(r.error);
    }
    setQ(r.data);
  }

  async function submitAnswer() {
    if (!q || !a) return;
    const r = await api.submitKYMQuestion(q.id, a);
    if (!r.success) {
      toast.error(r.error);
    }
    setRq(r.data);
  }

  useEffect(() => {
    if (!q) {
      getQuestion();
    }
  }, []);

  useEffect(() => {
    if (q) {
      console.log(q);
      setCountdown(30);
      setTimeout(submitAnswer, 30_000);
      const intId = setInterval(
        () => setCountdown((prevValue) => (prevValue > 0 ? prevValue - 1 : 0)),
        1000
      );

      return () => {
        clearInterval(intId);
      };
    }
  }, [q]);

  useEffect(() => {
    const el = document.getElementById("countdown");
    if (el) {
      el.style.width = `${(countdown / 30) * 100}%`;
    }
  }, [countdown]);

  return q ? (
    <div className="w-full flex flex-col gap-y-8 items-center">
      <Heading>Question {questionNumber}</Heading>
      <img
        src={q.image_url}
        alt={`question ${questionNumber}`}
        className="max-w-full max-h-96 rounded-xl"
      />
      {!rq && (
        <>
          <div className="w-full max-w-96">
            <div
              id="countdown"
              className="transition-all duration-1000 w-full h-1 bg-artcade-tangerine rounded-full"
            />
          </div>
          <div className="flex flex-wrap gap-2 max-w-md justify-center">
            {!a.title &&
              q.title_options.map((opt, idx) => (
                <div
                  key={`${opt}-${idx}`}
                  className="border border-artcade-aqua text-artcade-aqua hover:bg-artcade-aqua hover:text-black rounded-full py-1 px-2 text-sm cursor-pointer duration-150 ease-in"
                  onClick={() => {
                    setA((prevA) => ({
                      ...prevA,
                      title: opt,
                    }));
                  }}
                >
                  {opt}
                </div>
              ))}
            {!a.artist &&
              q.artist_options.map((opt, idx) => (
                <div
                  key={`${opt}-${idx}`}
                  className="border border-artcade-purple text-artcade-purple hover:bg-artcade-purple hover:text-black rounded-full py-1 px-2 text-sm cursor-pointer duration-150 ease-in"
                  onClick={() => {
                    setA((prevA) => ({
                      ...prevA,
                      artist: opt,
                    }));
                  }}
                >
                  {opt}
                </div>
              ))}
            {!a.supply &&
              q.supply_options.map((opt, idx) => (
                <div
                  key={`${opt}-${idx}`}
                  className="border border-artcade-pink text-artcade-pink hover:bg-artcade-pink hover:text-black rounded-full py-1 px-2 text-sm cursor-pointer duration-150 ease-in"
                  onClick={() => {
                    setA((prevA) => ({
                      ...prevA,
                      supply: opt,
                    }));
                  }}
                >
                  {opt}
                </div>
              ))}
            {!a.season &&
              q.season_options.map((opt, idx) => (
                <div
                  key={`${opt}-${idx}`}
                  className="border border-artcade-yellow text-artcade-yellow hover:bg-artcade-yellow hover:text-black rounded-full py-1 px-2 text-sm cursor-pointer duration-150 ease-in"
                  onClick={() => {
                    setA((prevA) => ({
                      ...prevA,
                      season: opt,
                    }));
                  }}
                >
                  {opt}
                </div>
              ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div
              className="w-48 h-12 px-4 flex items-center justify-center rounded-full border-2 border-artcade-aqua text-artcade-aqua text-2xl hover:bg-artcade-aqua hover:text-black duration-150 ease-in cursor-pointer"
              onClick={() => {
                setA((prevA) => ({
                  ...prevA,
                  title: null,
                }));
              }}
            >
              <p className="truncate">{a.title || "Title"}</p>
            </div>
            <div
              className="w-48 h-12 px-4 flex items-center justify-center rounded-full border-2 border-artcade-purple text-artcade-purple text-2xl hover:bg-artcade-purple hover:text-black duration-150 ease-in cursor-pointer"
              onClick={() => {
                setA((prevA) => ({
                  ...prevA,
                  artist: null,
                }));
              }}
            >
              <p className="truncate">{a.artist || "Artist"}</p>
            </div>
            <div
              className="w-48 h-12 px-4 flex items-center justify-center rounded-full border-2 border-artcade-pink text-artcade-pink text-2xl hover:bg-artcade-pink hover:text-black duration-150 ease-in cursor-pointer"
              onClick={() => {
                setA((prevA) => ({
                  ...prevA,
                  supply: null,
                }));
              }}
            >
              <p className="truncate">{a.supply || "Supply"}</p>
            </div>
            <div
              className="w-48 h-12 px-4 flex items-center justify-center rounded-full border-2 border-artcade-yellow text-artcade-yellow text-2xl hover:bg-artcade-yellow hover:text-black duration-150 ease-in cursor-pointer"
              onClick={() => {
                setA((prevA) => ({
                  ...prevA,
                  season: null,
                }));
              }}
            >
              <p className="truncate">{a.season || "Season"}</p>
            </div>
          </div>
          <Button
            variant="retro"
            onClick={submitAnswer}
            disabled={!a.title || !a.artist || !a.supply || !a.season}
          >
            Submit Answer
          </Button>
        </>
      )}
      {rq && (
        <div className="flex flex-col items-center gap-y-8">
          <div className="flex flex-col gap-y-4">
            <Paragraph className="text-artcade-aqua text-lg !mt-0 flex gap-x-2 items-center">
              {rq.title === a.title ? (
                <CircleCheckIcon className="w-6 h-6 stroke-green-500" />
              ) : (
                <CircleXIcon className="w-6 h-6 stroke-red-600" />
              )}
              Title: {rq.title}
            </Paragraph>
            <Paragraph className="text-artcade-purple text-lg !mt-0 flex gap-x-2 items-center">
              {rq.artist === a.artist ? (
                <CircleCheckIcon className="w-6 h-6 stroke-green-500" />
              ) : (
                <CircleXIcon className="w-6 h-6 stroke-red-600" />
              )}
              Artist: {rq.artist}
            </Paragraph>
            <Paragraph className="text-artcade-pink text-lg !mt-0 flex gap-x-2 items-center">
              {rq.supply === a.supply ? (
                <CircleCheckIcon className="w-6 h-6 stroke-green-500" />
              ) : (
                <CircleXIcon className="w-6 h-6 stroke-red-600" />
              )}
              Supply: {rq.supply}
            </Paragraph>
            <Paragraph className="text-artcade-yellow text-lg !mt-0 flex gap-x-2 items-center">
              {rq.season === a.season ? (
                <CircleCheckIcon className="w-6 h-6 stroke-green-500" />
              ) : (
                <CircleXIcon className="w-6 h-6 stroke-red-600" />
              )}
              Season: {rq.season}
            </Paragraph>
          </div>
          <Paragraph className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-title bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent !mt-0">
            Score: {rq.score}
          </Paragraph>
          <Button variant="retro" onClick={nextStep} className="mt-4">
            {questionNumber === 5 ? "Submit Gameplay" : "Next Question"}
          </Button>
        </div>
      )}
    </div>
  ) : null;
}
