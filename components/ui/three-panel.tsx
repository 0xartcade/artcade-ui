export function ThreePanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-[400px] bg-zinc-900/50 flex items-center justify-center">
          <p className="text-zinc-500">Panel {i}</p>
        </div>
      ))}
    </div>
  );
}
