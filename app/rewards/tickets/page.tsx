import React from 'react';

export default function RewardsTicketsPage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Tickets</h2>
      <div className="grid gap-4 max-w-2xl mx-auto">
        <div className="p-4 bg-zinc-900/50 rounded-lg flex justify-between items-center">
          <span>Game Ticket #1</span>
          <span>500 pts</span>
        </div>
        <div className="p-4 bg-zinc-900/50 rounded-lg flex justify-between items-center">
          <span>Game Ticket #2</span>
          <span>300 pts</span>
        </div>
      </div>
    </div>
  );
} 