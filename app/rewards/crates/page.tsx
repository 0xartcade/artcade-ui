export default function RewardsCratesPage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Reward Crates</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <div className="p-4 bg-zinc-900/50 rounded-lg">Crate Reward 1</div>
        <div className="p-4 bg-zinc-900/50 rounded-lg">Crate Reward 2</div>
        <div className="p-4 bg-zinc-900/50 rounded-lg">Crate Reward 3</div>
      </div>
    </div>
  );
} 