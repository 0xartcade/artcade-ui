import { InfoPanel } from "@/components/info-panel";

export default function DashboardPage() {
  return (
    <InfoPanel>
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold mb-4 text-center">Dashboard</h2>
        <div className="flex-1 space-y-2 max-w-2xl mx-auto w-full">
          <div className="p-4 bg-zinc-900/50 rounded-lg flex items-center justify-center">
            Dashboard Content
          </div>
        </div>
      </div>
    </InfoPanel>
  );
}
