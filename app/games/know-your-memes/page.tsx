"use client";

import { useState } from "react";
import Play from "./play";
import Start from "./start";
import Summary from "./summary";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function KnowYourMemes() {
  const [step, setStep] = useState(1);
  const [gameplayId, setGameplayId] = useState(0);

  const nextStep = async () => {
    if (step === 1) {
      const r = await api.startKYMGameplay();
      if (!r.success || !r.data) {
        toast.error(r.error);
        return;
      }
      setGameplayId(r.data.id);
    }
    setStep((prevStep) => (prevStep >= 7 ? 1 : prevStep + 1));
  };

  return (
    <>
      {step === 1 && <Start nextStep={nextStep} />}
      {step === 2 && (
        <Play
          key="q1"
          gameplayId={gameplayId}
          questionNumber={1}
          nextStep={nextStep}
        />
      )}
      {step === 3 && (
        <Play
          key="q2"
          gameplayId={gameplayId}
          questionNumber={2}
          nextStep={nextStep}
        />
      )}
      {step === 4 && (
        <Play
          key="q3"
          gameplayId={gameplayId}
          questionNumber={3}
          nextStep={nextStep}
        />
      )}
      {step === 5 && (
        <Play
          key="q4"
          gameplayId={gameplayId}
          questionNumber={4}
          nextStep={nextStep}
        />
      )}
      {step === 6 && (
        <Play
          key="q5"
          gameplayId={gameplayId}
          questionNumber={5}
          nextStep={nextStep}
        />
      )}
      {step === 7 && <Summary gameplayId={gameplayId} nextStep={nextStep} />}
    </>
  );
}
