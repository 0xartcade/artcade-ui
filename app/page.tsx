'use client';

import { ShapeCircleIcon } from "@/components/icons/shape-circle";
import { ShapeWordmarkIcon } from "@/components/icons/shape-wordmark";
import { Button } from "@/components/ui/button";
import {
  Heading,
  SubHeading,
  Title,
} from "@/components/ui/typography";
import { ChevronDownIcon, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { DevLogs } from "./dev-logs/dev-logs";

export default function Home() {
  const devLogsRef = useRef<HTMLDivElement>(null);

  const scrollToDevLogs = () => {
    devLogsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center gap-y-4 text-center">
      <div className="pt-48 flex flex-col items-center gap-y-4 min-h-[90vh] relative z-10">
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

        <Button asChild variant="outline" size="lg" className="mt-8 group">
          <Link href="/dashboard">
            Enter 0xArtcade
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>

        <button
          onClick={scrollToDevLogs}
          className="flex flex-col gap-y-1 items-center mt-auto cursor-pointer"
        >
          <Heading>Dev Logs</Heading>
          <ChevronDownIcon className="w-6 h-6 stroke-foreground stroke-1" />
        </button>
      </div>

      <div ref={devLogsRef} className="w-full relative z-10">
        <div className="container mx-auto py-16">
          <DevLogs />
        </div>
      </div>

      <Image
        src="/logo.png"
        alt="logo"
        width="1241"
        height="1261"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-full sm:max-w-xl opacity-5 -z-10"
      />
    </div>
  );
}
