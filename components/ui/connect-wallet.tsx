import { Wallet } from "lucide-react";
import { ConnectWalletButton } from "./connect-button";

export function ConnectWalletPrompt() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-20">
      <Wallet className="w-12 h-12 text-zinc-400" />
      <h2 className="text-xl font-semibold">Connect Your Wallet</h2>
      <p className="text-zinc-400 text-center max-w-md">
        Please connect your wallet to access this section
      </p>
      <ConnectWalletButton />
    </div>
  );
}
