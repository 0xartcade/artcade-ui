// UI Component imports
import { ConnectWalletButton } from "@/components/ui/connect-button"; // Wallet connection component
import { LucideIcon } from "lucide-react"; // Type for Lucide icons
import { Gamepad2, Trophy, Ticket, Gift } from "lucide-react"; // Icon imports for stats

//////////////////////////////////////////////////////
/// TYPES
//////////////////////////////////////////////////////

interface StatData {
  label: string;
  value: string;
  icon: LucideIcon;
}

interface StatCardProps {
  stat: StatData;
  showConnect?: boolean;
}

//////////////////////////////////////////////////////
/// STATS DATA (Replace)
//////////////////////////////////////////////////////

export const STATS = {
  global: [
    { label: "Games Played", value: "69", icon: Gamepad2 },
    { label: "Points Scored", value: "1.2M", icon: Trophy },
    { label: "Tickets Earned", value: "856", icon: Ticket },
    { label: "Rewards Unlocked", value: "42", icon: Gift },
  ],
  personal: [
    { label: "Games Played", value: "0", icon: Gamepad2 },
    { label: "Points Scored", value: "0", icon: Trophy },
    { label: "Tickets Earned", value: "0", icon: Ticket },
    { label: "Rewards Unlocked", value: "0", icon: Gift },
  ],
} as const;

//////////////////////////////////////////////////////
/// STAT CARD COMPONENT
//////////////////////////////////////////////////////

export function StatCard({ stat, showConnect = false }: StatCardProps) {
  return (
    <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50">
      <div className="flex flex-col items-center justify-center min-h-[140px]">
        <stat.icon className="w-6 h-6 text-zinc-400 mb-2" />
        <div className="h-9 flex items-center justify-center">
          {showConnect ? (
            <div className="scale-75">
              <ConnectWalletButton />
            </div>
          ) : (
            <span className="text-2xl font-semibold">{stat.value}</span>
          )}
        </div>
        <span className="text-sm font-medium mt-2">{stat.label}</span>
      </div>
    </div>
  );
}
