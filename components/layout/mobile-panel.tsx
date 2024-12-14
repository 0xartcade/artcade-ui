"use client";

import QRCode from "react-qr-code";
import { Fragment } from "react";

//////////////////////////////////////////////////////
/// MOCK DATA (Replace)
//////////////////////////////////////////////////////

function getMockConnectionData() {
  return {
    connectionCode: "123-456", // Mock connection code - to be replaced with API data
    baseUrl: "https://app.0xartcade.xyz", // Mock base URL - should come from environment config
  };
}

//////////////////////////////////////////////////////
/// MOBILE PANEL COMPONENT
//////////////////////////////////////////////////////

export default function MobilePanel() {
  const { connectionCode, baseUrl } = getMockConnectionData(); // Fetch mock connection data - replace with API call
  const qrValue = `${baseUrl}/connect/${connectionCode}`; // Generate QR code URL from connection data

  return (
    <div className="h-full flex items-center justify-start p-4">
      <div className="relative h-[95%] aspect-[1/2] bg-zinc-800 rounded-[45px] p-4 shadow-xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-black rounded-b-2xl" />
        <div className="h-full w-full bg-zinc-950 rounded-[35px] overflow-hidden">
          <div className="w-full h-full flex flex-col items-center justify-center p-6 space-y-6">
            <Fragment>
              <p className="text-zinc-400 text-sm">Scan Code to Connect</p>
              <div className="w-48 h-48 bg-white p-3 rounded-lg flex items-center justify-center">
                <QRCode
                  value={qrValue}
                  style={{ width: "100%", height: "100%" }}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <div className="text-center space-y-4">
                <p className="text-zinc-400 text-sm">
                  Visit {baseUrl}
                  <br />
                  and enter code:
                </p>
                <p className="text-xl font-mono font-bold tracking-wider">
                  {connectionCode}
                </p>
              </div>
            </Fragment>
          </div>
        </div>
      </div>
    </div>
  );
}
