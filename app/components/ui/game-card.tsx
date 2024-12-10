import { Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameCardProps {
  name: string;
  description: string;
  gameType: string;
}

export function GameCard({ name, description, gameType }: GameCardProps) {
  return (
    <div className={cn(
      "flex items-stretch gap-4 p-3 rounded-2xl bg-zinc-900/50 border border-zinc-800/50",
      "hover:bg-zinc-900/70 transition-colors group cursor-pointer"
    )}>
      {/* Game Icon */}
      <div className="flex-none w-48 flex items-center justify-center px-6 bg-zinc-800/50 rounded-xl">
        <Gamepad2 className="w-8 h-8 text-zinc-600" />
      </div>

      {/* Game Info */}
      <div className="flex-1 flex flex-col justify-center min-w-0">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-medium truncate">{name}</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-400 flex-none">
            {gameType}
          </span>
        </div>
        <p className="text-sm text-zinc-400 line-clamp-2 mt-1">
          {description}
        </p>
      </div>

      {/* Play Button */}
      <div className="flex-none w-32 flex items-center justify-center bg-zinc-800/50 rounded-xl">
        <button className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors text-sm">
          Play Now
        </button>
      </div>
    </div>
  );
} 