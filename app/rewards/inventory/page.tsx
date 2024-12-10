import React from 'react';

export default function InventoryPage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Inventory</h2>
      <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
        <div className="p-4 bg-zinc-900/50 rounded-lg">Item Placeholder 1</div>
        <div className="p-4 bg-zinc-900/50 rounded-lg">Item Placeholder 2</div>
        <div className="p-4 bg-zinc-900/50 rounded-lg">Item Placeholder 3</div>
      </div>
    </div>
  );
} 