"use client";

import { InfoPanel } from "@/components/layout/info-panel";
import Button from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Caption, Heading, Paragraph } from "@/components/ui/typography";
import { api } from "@/lib/api";
import { withAuth } from "@/lib/auth-context";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import QRCode from "react-qr-code";
import { toast } from "sonner";

//////////////////////////////////////////////////////
/// GAME LEADERBOARD PAGE
//////////////////////////////////////////////////////

function GamePlayPage() {
  const [otp, setOtp] = useState("");
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

  async function generateOTP() {
    if (otp) return;

    const response = await api.generateOTP();
    if (!response.success) {
      toast.error(response.error);
      throw new Error(response.error);
    }
    setOtp(response.data!);
  }

  return (
    <InfoPanel>
      {game && (
        <div className="flex flex-col gap-y-14 md:gap-y-8 items-center">
          <Heading>{game.name}</Heading>
          <div className="w-full hidden md:flex flex-col gap-y-3 items-center">
            <div className="rounded-lg p-4 bg-secondary w-fit">
              <QRCode value={game.url} />
            </div>
            <Caption>Scan the QR code to get to the game</Caption>
            <Caption>OR</Caption>
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard
                  .writeText(game.url)
                  .then(() => {
                    toast.success("Copied to clipboard");
                  })
                  .catch(() => {
                    toast.error("Something went wrong");
                  });
              }}
            >
              Copy URL
            </Button>
          </div>
          <Link href={game.url} target="_blank" className="md:hidden">
            <Button>Play Now</Button>
          </Link>
          <div className="flex flex-col items-center gap-y-2">
            <Paragraph>If prompted for a connect code, click here:</Paragraph>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" onClick={generateOTP}>
                  Generate OTP
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Connect To Mobile</DialogTitle>
                  <DialogDescription>
                    Use the following code to connect your mobile device
                  </DialogDescription>
                </DialogHeader>
                {otp ? (
                  <Heading>
                    {otp.slice(0, 3)}·{otp.slice(-3)}
                  </Heading>
                ) : (
                  <div className="bg-secondary w-28 h-8 animate-pulse" />
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </InfoPanel>
  );
}

export default withAuth(GamePlayPage);
