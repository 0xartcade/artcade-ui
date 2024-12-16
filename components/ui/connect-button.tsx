import { ConnectKitButton } from "connectkit";
import { cn } from "@/lib/utils";

export const ConnectWalletButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address, ensName }) => {
        return (
          <button
            onClick={show}
            className={cn(
              "group relative font-orbitron uppercase tracking-wider overflow-hidden",
              "transition-all duration-300 px-4 py-2 rounded-lg",
              isConnected 
                ? "text-base border border-white/10 bg-zinc-900/40 backdrop-blur-sm"
                : "text-sm border-2 border-artcade-purple/30 bg-zinc-900/40 text-zinc-200 shadow-[0_0_15px_-3px] shadow-artcade-aqua/10"
            )}
          >
            {!isConnected && (
              <div
                className="absolute inset-0 -z-10 bg-gradient-to-r from-artcade-aqua via-artcade-purple to-artcade-pink opacity-0 
                transition-opacity duration-300 group-hover:opacity-30"
              />
            )}
            {!isConnected && (
              <div
                className="absolute -top-1/2 -left-1/2 h-[200%] w-[200%] transition-all duration-300
                group-hover:-top-full group-hover:-left-full"
                style={{
                  background: 'linear-gradient(to bottom right, rgba(82, 219, 255, 0.4) 0%, rgba(118, 55, 254, 0.2) 50%, transparent 50%, transparent 100%)',
                  transform: 'rotate(-45deg)',
                }}
              />
            )}
            {isConnected ? (
              <span className="bg-gradient-to-r from-artcade-aqua via-artcade-purple to-artcade-pink bg-clip-text text-transparent">
                {ensName
                  ? ensName
                  : `${address?.slice(0, 6)}···${address?.slice(-4)}`}
              </span>
            ) : (
              <>
                <span className="relative">Connect Wallet</span>
                <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-artcade-aqua via-artcade-purple to-artcade-pink bg-clip-text text-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Connect Wallet
                </span>
              </>
            )}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
