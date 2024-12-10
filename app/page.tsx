'use client';

import { DevLogs } from "@/components/dev-logs/dev-logs";
import { ShapeCircleIcon } from "@/components/icons/shape-circle";
import { ShapeWordmarkIcon } from "@/components/icons/shape-wordmark";
import {
  Heading,
  SubHeading,
  Title,
} from "@/components/ui/typography";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export default function Home() {
  const devLogsRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex flex-col items-center gap-y-4 text-center">
      <div className="pt-48 flex flex-col items-center gap-y-4 min-h-[90vh]">
        <Title>0xARTCADE</Title>
        <SubHeading className="max-w-lg">gameified art discovery</SubHeading>
        <div className="flex gap-x-8 justify-center">
          <div className="flex gap-x-2">
            <ShapeCircleIcon className="w-6" />
            <ShapeWordmarkIcon className="w-12" />
          </div>
          <Image
            src="/shapecraftlogo_white.png"
            alt="Shapecraft Logo"
            width="1000"
            height="291"
            className="w-20 h-6"
          />
        </div>
        <button
          className="flex flex-col gap-y-1 items-center mt-auto scroll-mt-2"
          ref={devLogsRef}
          onClick={() => {
            devLogsRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          <Heading>Dev Logs</Heading>
          <ChevronDownIcon className="w-6 h-6 stroke-foreground stroke-1" />
        </button>
      </div>
      <div className="flex flex-col gap-y-10 w-full items-center justify-center">
        <DevLogs />
      </div>
      <Image
        src="/logo.png"
        alt="logo"
        width="1241"
        height="1261"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-full sm:max-w-xl opacity-5"
      />
    </div>
  );
}
