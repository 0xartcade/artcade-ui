import { Gamepad2Icon } from "lucide-react";
import { SubHeading2, Paragraph } from "./typography";
import Button from "./button";
import Link from "next/link";

interface GameCardProps {
  name: string;
  description: string;
  gameType: string;
  collaborator?: string;
  url?: string;
  ctaName?: string;
}

export function GameCard({
  name,
  description,
  gameType,
  collaborator,
  url,
  ctaName = "Play Now",
}: GameCardProps) {
  return (
    <div
      className={
        "w-full flex items-stretch gap-3 p-3 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 h-32"
      }
    >
      {/* Game Icon */}
      <div className="flex-none w-48 flex items-center justify-center px-4 bg-zinc-800/50 rounded-xl">
        <Gamepad2Icon className="w-8 h-8 text-zinc-600" />
      </div>

      {/* Game Info */}
      <div className="flex-1 flex flex-col min-w-0 py-1">
        <div className="flex items-center gap-4">
          <div>
            <SubHeading2>{name}</SubHeading2>
          </div>
          {collaborator && (
            <span className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-400 flex-none">
              {collaborator}
            </span>
          )}
          <span className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-400 flex-none">
            {gameType}
          </span>
        </div>
        <Paragraph>{description}</Paragraph>
      </div>

      {/* Play Button */}
      {url && (
        <Link href={url} className="h-full flex items-center justify-center">
          <Button variant="secondary" size="sm">
            {ctaName}
          </Button>
        </Link>
      )}
    </div>
  );
}
