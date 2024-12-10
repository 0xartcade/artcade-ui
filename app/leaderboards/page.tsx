import { InfoPanel } from "@/components/info-panel";

export default function LeaderboardsPage() {
  return (
    <InfoPanel>
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold mb-4 text-center">Leaderboards</h2>
        <div className="flex-1 space-y-2 max-w-2xl mx-auto w-full">
          <div className="p-4 bg-zinc-900/50 rounded-lg flex justify-between items-center">
            <span>Player 1</span>
            <span>1000 pts</span>
          </div>
          <div className="p-4 bg-zinc-900/50 rounded-lg flex justify-between items-center">
            <span>Player 2</span>
            <span>800 pts</span>
          </div>
          <div className="p-4 bg-zinc-900/50 rounded-lg flex justify-between items-center">
            <span>Player 3</span>
            <span>600 pts</span>
          </div>
        </div>
      </div>
    </InfoPanel>
  );
}
