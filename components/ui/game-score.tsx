import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Gamepad2Icon } from "lucide-react";
import { SubHeading2 } from "./typography";

interface GameScoreProps {
  gameName: string;
  date: string;
  score: number;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
  gameId?: number;
}

export function GameScore({
  gameName,
  date,
  score,
  isSelected,
  onSelect,
  gameId,
}: GameScoreProps) {
  return (
    <div
      className={cn(
        "artcade-container-horizontal group h-32 relative overflow-hidden",
        isSelected && "border-white/20"
      )}
    >
      <div className="artcade-hover-gradient" />
      <div className="artcade-hover-sweep" />
      <div className="absolute inset-3 bg-zinc-900 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
        <div className="flex h-full">
          {/* Selection overlay */}
          {isSelected && (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-artcade-aqua to-artcade-purple opacity-30" />
              <div 
                className="absolute -top-1/2 -left-1/2 h-[200%] w-[200%]"
                style={{
                  background: 'linear-gradient(to bottom right, rgba(82, 219, 255, 0.4) 0%, rgba(118, 55, 254, 0.2) 50%, transparent 50%, transparent 100%)',
                  transform: 'rotate(-45deg) translate(-50%, -50%)',
                }}
              />
            </>
          )}

          {/* Game Icon/Thumbnail */}
          <div className="relative flex-none w-48 h-full flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm rounded-xl overflow-hidden">
            {gameId === 1 ? (
              <Image
                src="/games/thumbnail_game01.jpg"
                alt={gameName}
                width={192}
                height={128}
                className="w-full h-full object-cover"
                priority
              />
            ) : (
              <Gamepad2Icon className="w-8 h-8 text-zinc-400" />
            )}
          </div>

          {/* Stats */}
          <div className="relative flex flex-col justify-center gap-2 px-6">
            <SubHeading2 className="font-orbitron text-sm text-zinc-400 uppercase tracking-wider">
              Timestamp
            </SubHeading2>
            <span className="font-orbitron text-lg text-white tracking-wider">
              {new Date(date).toLocaleDateString()}
            </span>
          </div>

          <div className="relative flex flex-col justify-center gap-2 px-6">
            <SubHeading2 className="font-orbitron text-sm text-zinc-400 uppercase tracking-wider">
              Points
            </SubHeading2>
            <span className="font-orbitron text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {score.toLocaleString()}
            </span>
          </div>

          {/* Checkbox */}
          <div className="relative flex-none w-16 flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm rounded-xl ml-auto">
            <div
              className={cn(
                "w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-colors",
                isSelected
                  ? "bg-zinc-800/80 border-white/40"
                  : "border-zinc-700 hover:border-zinc-600"
              )}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={onSelect}
                className="h-4 w-4 border-none data-[state=checked]:bg-transparent data-[state=checked]:text-white"
              />
            </div>
          </div>

          {/* Hover effect (only shows when not selected) */}
          {!isSelected && <div className="artcade-hover-sweep" />}
        </div>
      </div>
    </div>
  );
}
