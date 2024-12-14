import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface GameScoreProps {
  gameName: string;
  date: string;
  score: number;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
}

export function GameScore({
  gameName,
  date,
  score,
  isSelected,
  onSelect,
}: GameScoreProps) {
  return (
    <div
      className={cn(
        "flex items-stretch gap-4 p-3 rounded-2xl bg-zinc-900/50 border border-zinc-800/50",
        "hover:bg-zinc-900/70 transition-colors",
        isSelected && "border-zinc-600"
      )}
    >
      {/* Game Name */}
      <div className="flex-none flex items-center justify-center px-6 bg-zinc-800/50 rounded-xl">
        <span className="font-medium text-sm">{gameName}</span>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-center gap-3">
        <div className="h-11 px-6 flex items-center rounded-lg bg-zinc-800/50 text-sm text-zinc-400">
          {new Date(date).toLocaleDateString()}
        </div>
        <div className="h-11 px-6 flex items-center rounded-lg bg-zinc-800/50 text-sm text-zinc-400">
          {score.toLocaleString()} points
        </div>
      </div>

      {/* Checkbox */}
      <div className="flex-none w-16 flex items-center justify-center bg-zinc-800/50 rounded-xl ml-auto">
        <div
          className={cn(
            "w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-colors",
            isSelected
              ? "bg-zinc-700 border-zinc-600"
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
    </div>
  );
}
