import { ConnectWalletButton } from "./connect-button";
import { Wallet } from "lucide-react";

export function ConnectWalletPrompt() {
  return (
    <div className="flex flex-col items-center pt-15">
      <div className="relative w-full max-w-lg">
        <div className="artcade-container-vertical group p-3">
          <div className="artcade-hover-gradient" />
          <div className="artcade-hover-sweep" />
          <div className="bg-zinc-900 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
            <div className="flex flex-col items-center justify-center w-full py-8 px-8 gap-4">
              <Wallet
                className="w-24 h-24 transition-all duration-300"
                style={{
                  stroke: "url(#icon-gradient)",
                  fill: "none",
                  strokeWidth: 1.25,
                }}
              />
              <svg width="0" height="0">
                <linearGradient
                  id="icon-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop stopColor="#52DBFF" offset="0%" />
                  <stop stopColor="#7637FE" offset="100%" />
                </linearGradient>
              </svg>

              <div className="flex flex-col items-center gap-2">
                <h3
                  className="font-orbitron text-xl uppercase text-transparent bg-clip-text tracking-[0.15em] text-center whitespace-nowrap"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8))",
                  }}
                >
                  Authentication Required
                </h3>

                <p className="font-system text-base text-zinc-400 uppercase tracking-wider text-center max-w-[280px]">
                  Please connect your wallet to access this section
                </p>
              </div>

              <ConnectWalletButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
