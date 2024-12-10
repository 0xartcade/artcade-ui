export default function GamesPage() {
  return (
    <main className="flex-1 flex flex-col">
      <div className="container mx-auto p-4 flex-1 flex flex-col">
        <h2 className="text-xl font-semibold mb-4 text-center">Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          <div className="p-4 bg-zinc-900/50 rounded-lg aspect-video flex items-center justify-center">
            Game 1
          </div>
          <div className="p-4 bg-zinc-900/50 rounded-lg aspect-video flex items-center justify-center">
            Game 2
          </div>
          <div className="p-4 bg-zinc-900/50 rounded-lg aspect-video flex items-center justify-center">
            Game 3
          </div>
        </div>
      </div>
    </main>
  );
}
