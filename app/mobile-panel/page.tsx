'use client';

import { useWalletStore } from "@/lib/store/wallet-store";
import { ConnectWalletButton } from "@/components/ui/connect-wallet";
import QRCode from "react-qr-code";

export default function MobilePanel() {
  const { address } = useWalletStore();
  
  // For demo purposes - in real app this would be a dynamic token/URL
  const connectionCode = "123-456";
  const qrValue = `https://app.0xartcade.xyz/connect/${connectionCode}`;

  return (
    <div className="h-full flex items-center justify-start p-4">
      {/* iPhone Frame */}
      <div className="relative h-[95%] aspect-[1/2] bg-zinc-800 rounded-[45px] p-4 shadow-xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-black rounded-b-2xl" />
        
        {/* Inner Screen */}
        <div className="h-full w-full bg-zinc-950 rounded-[35px] overflow-hidden">
          <div className="w-full h-full flex flex-col items-center justify-center p-6 space-y-6">
            {!address ? (
              <ConnectWalletButton />
            ) : (
              <>
                <p className="text-zinc-400 text-sm">Scan Code to Connect</p>
                {/* QR Code */}
                <div className="w-48 h-48 bg-white p-3 rounded-lg flex items-center justify-center">
                  <QRCode
                    value={qrValue}
                    style={{ width: "100%", height: "100%" }}
                    viewBox={`0 0 256 256`}
                  />
                </div>
                
                {/* Code Section */}
                <div className="text-center space-y-4">
                  <p className="text-zinc-400 text-sm">
                    Visit app.0xartcade.xyz<br />and enter code:
                  </p>
                  <p className="text-xl font-mono font-bold tracking-wider">{connectionCode}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 