import { DevLogs } from "@/components/dev-logs/dev-logs";
import { ShapeCircleIcon } from "@/components/icons/shape-circle";
import { ShapeWordmarkIcon } from "@/components/icons/shape-wordmark";
import {
  Heading,
  Paragraph,
  SubHeading,
  SubHeading2,
  Title,
} from "@/components/ui/typography";
import { ChevronDownSquareIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-y-4 text-center">
      <Title>Artcade</Title>
      <SubHeading className="max-w-lg">gameified art discovery</SubHeading>

      <Image
        src="/logo.png"
        alt="logo"
        width="1241"
        height="1261"
        className="sm:hidden w-48"
      />
      <SubHeading2 className="mt-8">Coming soon</SubHeading2>
      <section className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-8 items-center">
        <div className="flex gap-x-2">
          <ShapeCircleIcon className="w-12 md:w-14" />
          <ShapeWordmarkIcon className="w-24 md:w-28" />
        </div>
        <Image
          src="/logo.png"
          alt="logo"
          width="1241"
          height="1261"
          className="hidden sm:block w-48"
        />
        <Image
          src="/shapecraftlogo_white.png"
          alt="Shapecraft Logo"
          width="1000"
          height="291"
          className="w-48"
        />
      </section>
      <section className="mt-8">
        <SubHeading2>Follow along on X</SubHeading2>
        <div className="flex gap-x-8 mt-4">
          <Link
            href="https://x.com/scobelverse"
            target="_blank"
            rel="noopener noreferrer"
            className="duration-150 ease-in hover:scale-105"
          >
            <Paragraph className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
              @scobelverse
            </Paragraph>
          </Link>
          <Link
            href="https://x.com/mpeyfuss"
            target="_blank"
            rel="noopener noreferrer"
            className="duration-150 ease-in hover:scale-105"
          >
            <Paragraph className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
              @mpeyfuss
            </Paragraph>
          </Link>
        </div>
      </section>
      <section className="mt-8 flex flex-col gap-y-10 w-full items-center">
        <div className="flex gap-x-4 items-center">
          <Heading>Dev Logs</Heading>
          <ChevronDownSquareIcon className="w-6 h-6 stroke-foreground stroke-1" />
        </div>
        <DevLogs />
      </section>
    </div>
  );
}
