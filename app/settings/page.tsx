import { InfoPanel } from "@/components/info-panel"

export default function SettingsPage() {
  return (
    <InfoPanel>
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold mb-4 text-center">Settings</h2>
        <div className="flex-1 space-y-4 max-w-2xl mx-auto w-full">
          <div className="p-6 bg-zinc-900/50 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Profile Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  Wallet Address
                </label>
                <div className="p-2 bg-zinc-800/50 rounded text-zinc-300">
                  0x1234...5678
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  Display Name
                </label>
                <div className="p-2 bg-zinc-800/50 rounded text-zinc-300">
                  Artcade User
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-zinc-900/50 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Preferences</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  Theme
                </label>
                <div className="p-2 bg-zinc-800/50 rounded text-zinc-300">
                  Dark
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InfoPanel>
  )
} 