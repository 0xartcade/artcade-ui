"use client";

import Button from "@/components/ui/button";
import { Caption } from "@/components/ui/typography";
import { api } from "@/lib/api";
import { withAuth } from "@/lib/auth-context";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import QRCode from "react-qr-code";
import { toast } from "sonner";

//////////////////////////////////////////////////////
/// GAME PLAY PAGE
//////////////////////////////////////////////////////

function GamePlayPage() {
  const [otp, setOtp] = useState("");
  const [userType, setUserType] = useState<"new" | "returning">("new");
  const { gameId } = useParams<{ gameId: string }>();
  const { data: game } = useQuery({
    queryKey: ["game", gameId],
    queryFn: async () => {
      const response = await api.getGame(parseInt(gameId, 10));
      if (!response.success) {
        toast.error(response.error);
        throw new Error(response.error);
      }
      return response.data;
    },
  });

  // useQuery({
  //   queryKey: ["otp"],
  //   queryFn: async () => {
  //     const response = await api.generateOTP();
  //     if (!response.success) {
  //       toast.error(response.error);
  //       throw new Error(response.error);
  //     }
  //     setOtp(response.data!);
  //     return response.data;
  //   },
  // });

  async function generateOTP() {
    if (otp) return;
    const response = await api.generateOTP();
    if (!response.success) {
      toast.error(response.error);
      throw new Error(response.error);
    }
    setOtp(response.data!);
    return response.data;
  }

  return (
    <div className="page-layout">
      <div className="page-layout-inner">
        {/* Page Content */}
        <div className="flex flex-col space-y-12 max-w-7xl mx-auto">
          {game && (
            <div className="flex flex-col md:flex-row justify-center items-start gap-12">
              {/* Left Side - Instructions */}
              <div className="w-full md:w-[400px] hidden md:block">
                <div className="flex flex-col space-y-4">
                  {/* Tabs */}
                  <div className="w-full px-6">
                    <div className="flex justify-center items-center gap-x-4">
                      <button
                        onClick={() => setUserType("new")}
                        className={`relative font-orbitron text-xs uppercase tracking-wider transition-colors group ${
                          userType === "new"
                            ? "text-white"
                            : "text-zinc-500 hover:text-white"
                        }`}
                      >
                        New Player
                        {userType === "new" && (
                          <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-artcade-aqua to-artcade-purple" />
                        )}
                      </button>
                      <button
                        onClick={() => setUserType("returning")}
                        className={`relative font-orbitron text-xs uppercase tracking-wider transition-colors group ${
                          userType === "returning"
                            ? "text-white"
                            : "text-zinc-500 hover:text-white"
                        }`}
                      >
                        Returning Player
                        {userType === "returning" && (
                          <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-artcade-aqua to-artcade-purple" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Instructions Stack */}
                  <div className="flex flex-col space-y-6 border-t border-white/5 pt-3">
                    {userType === "new" ? (
                      <>
                        <div className="artcade-container-vertical group relative p-6">
                          <div className="artcade-hover-gradient" />
                          <div className="artcade-hover-sweep" />
                          <div className="relative flex flex-col items-center gap-y-4 text-center">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-artcade-aqua to-artcade-purple p-4">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-full h-full text-black"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 016.75 6h10.5a3 3 0 012.684 1.657A4.505 4.505 0 0018.75 7.5H5.25z"
                                />
                              </svg>
                            </div>
                            <div className="font-orbitron text-lg text-white uppercase tracking-wider">
                              1. Scan QR Code
                            </div>
                            <Caption className="text-zinc-400 text-base">
                              Scan the QR code with your mobile phone or copy
                              the URL to your browser
                            </Caption>
                          </div>
                        </div>

                        <div className="artcade-container-vertical group relative p-6">
                          <div className="artcade-hover-gradient" />
                          <div className="artcade-hover-sweep" />
                          <div className="relative flex flex-col items-center gap-y-4 text-center">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-artcade-aqua to-artcade-purple p-4">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-full h-full text-black"
                              >
                                <path d="M11.47 1.72a.75.75 0 011.06 0l3 3a.75.75 0 01-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 01-1.06-1.06l3-3zM11.25 7.5V15a.75.75 0 001.5 0V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
                              </svg>
                            </div>
                            <div className="font-orbitron text-lg text-white uppercase tracking-wider">
                              2. Add to Home
                            </div>
                            <Caption className="text-zinc-400 text-base">
                              Follow the instructions to add the web app to your
                              device&apos;s home screen.
                            </Caption>
                          </div>
                        </div>

                        <div className="artcade-container-vertical group relative p-6">
                          <div className="artcade-hover-gradient" />
                          <div className="artcade-hover-sweep" />
                          <div className="relative flex flex-col items-center gap-y-4 text-center">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-artcade-aqua to-artcade-purple p-4">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-full h-full text-black"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="font-orbitron text-lg text-white uppercase tracking-wider">
                              3. Enter OTP
                            </div>
                            <Caption className="text-zinc-400 text-base">
                              Generate a one-time password (if needed) to
                              securely access the game
                            </Caption>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="artcade-container-vertical group relative p-6">
                          <div className="artcade-hover-gradient" />
                          <div className="artcade-hover-sweep" />
                          <div className="relative flex flex-col items-center gap-y-4 text-center">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-artcade-aqua to-artcade-purple p-4">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-full h-full text-black"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 016.75 6h10.5a3 3 0 012.684 1.657A4.505 4.505 0 0018.75 7.5H5.25z"
                                />
                              </svg>
                            </div>
                            <div className="font-orbitron text-lg text-white uppercase tracking-wider">
                              1. Launch App
                            </div>
                            <Caption className="text-zinc-400 text-base">
                              Open the 0xArtcade application from your
                              device&apos;s home screen
                            </Caption>
                          </div>
                        </div>

                        <div className="artcade-container-vertical group relative p-6">
                          <div className="artcade-hover-gradient" />
                          <div className="artcade-hover-sweep" />
                          <div className="relative flex flex-col items-center gap-y-4 text-center">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-artcade-aqua to-artcade-purple p-4">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-full h-full text-black"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="font-orbitron text-lg text-white uppercase tracking-wider">
                              2. Enter OTP
                            </div>
                            <Caption className="text-zinc-400 text-base">
                              Generate a one-time password (if needed) to verify
                              your identity and access the game
                            </Caption>
                          </div>
                        </div>

                        <div className="artcade-container-vertical group relative p-6">
                          <div className="artcade-hover-gradient" />
                          <div className="artcade-hover-sweep" />
                          <div className="relative flex flex-col items-center gap-y-4 text-center">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-artcade-aqua to-artcade-purple p-4">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-full h-full text-black"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="font-orbitron text-lg text-white uppercase tracking-wider">
                              3. Start Playing
                            </div>
                            <Caption className="text-zinc-400 text-base">
                              Begin your gaming experience on your mobile device
                            </Caption>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side - iPhone Mock */}
              <div className="flex-1 flex justify-center max-w-[400px]">
                <div className="artcade-container-vertical group relative h-[800px] aspect-[1/2] rounded-[85px]">
                  <div className="artcade-hover-gradient rounded-[85px]" />
                  <div className="artcade-hover-sweep rounded-[85px]" />
                  <div className="absolute inset-3 rounded-[75px]">
                    <div className="relative h-full w-full bg-zinc-800 rounded-[75px] p-2 shadow-xl">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-black rounded-b-2xl" />
                      <div className="h-full w-full bg-zinc-950 rounded-[65px] overflow-hidden">
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 space-y-6">
                          <div className="font-orbitron text-2xl font-black text-white uppercase tracking-wider">
                            {game.name}
                          </div>

                          <div className="font-orbitron text-sm text-zinc-500 uppercase tracking-wider">
                            Powered by ArtGuessr
                          </div>

                          <div className="font-orbitron text-xl bg-gradient-to-r from-artcade-aqua to-artcade-purple bg-clip-text text-transparent uppercase tracking-wider">
                            Scan Code to Play
                          </div>

                          {/* QR Code Container */}
                          <div className="w-64 h-64 bg-white p-3 rounded-lg flex items-center justify-center">
                            <QRCode
                              value={game.url}
                              style={{ width: "100%", height: "100%" }}
                              viewBox={`0 0 256 256`}
                            />
                          </div>

                          <div className="flex flex-col items-center gap-4">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(game.url);
                                const buttonText =
                                  document.getElementById("copyButtonText");
                                if (buttonText) {
                                  buttonText.textContent = "Copied!";
                                  setTimeout(() => {
                                    buttonText.textContent = "Copy URL";
                                  }, 2000);
                                }
                              }}
                              id="copyButton"
                              className="relative font-orbitron text-sm bg-gradient-to-r from-artcade-aqua to-artcade-purple bg-clip-text text-transparent uppercase tracking-wider hover:opacity-80 transition-opacity"
                            >
                              <span id="copyButtonText">Copy URL</span>
                            </button>

                            {otp ? (
                              <div className="flex flex-col items-center gap-2 mt-4">
                                <div className="font-orbitron text-sm text-zinc-400 uppercase tracking-wider">
                                  One-Time Password
                                </div>

                                <div className="font-orbitron text-4xl font-bold tracking-[0.3em] text-white">
                                  {otp.slice(0, 3)}
                                  <span className="text-artcade-aqua px-1">
                                    ·
                                  </span>
                                  {otp.slice(-3)}
                                </div>

                                <div className="font-orbitron text-xs text-zinc-500 uppercase tracking-wider">
                                  Valid for 5 minutes
                                </div>
                              </div>
                            ) : (
                              <Button
                                variant="outline"
                                className="uppercase"
                                onClick={generateOTP}
                              >
                                Generate OTP
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href={game.url}
                target="_blank"
                className="md:hidden flex justify-center"
              >
                <Button variant="retro">Play Now</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(GamePlayPage);
