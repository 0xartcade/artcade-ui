import React from 'react';

export default function RewardsPage() {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-xl font-semibold mb-4 text-center">Rewards</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <div className="p-8 bg-zinc-900/50 rounded-lg flex flex-col items-center justify-center gap-2">
          <h3 className="font-semibold">Tickets</h3>
          <p className="text-zinc-400">Earn tickets by playing games</p>
        </div>
        <div className="p-8 bg-zinc-900/50 rounded-lg flex flex-col items-center justify-center gap-2">
          <h3 className="font-semibold">Crates</h3>
          <p className="text-zinc-400">Open crates to get rewards</p>
        </div>
        <div className="p-8 bg-zinc-900/50 rounded-lg flex flex-col items-center justify-center gap-2">
          <h3 className="font-semibold">Inventory</h3>
          <p className="text-zinc-400">View your collected items</p>
        </div>
      </div>
    </div>
  );
}
