'use client';

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useWalletStore } from "@/lib/store/wallet-store"
import { WalletIcon } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Wallet } from "lucide-react"

export function ConnectWalletButton() {
  const { address, connect } = useWalletStore()
  const { login } = useAuth()

  const handleConnect = async () => {
    await connect()
    login()
  }

  if (address) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-zinc-800">
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect your wallet</DialogTitle>
          <DialogDescription>
            Choose a wallet to connect to Artcade
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            onClick={handleConnect}
            className="w-full justify-start gap-4"
            variant="outline"
          >
            <WalletIcon className="h-5 w-5" />
            MetaMask
          </Button>
          <Button
            onClick={handleConnect}
            className="w-full justify-start gap-4"
            variant="outline"
          >
            <WalletIcon className="h-5 w-5" />
            WalletConnect
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ConnectWalletPrompt() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-[calc(100vh-12rem)]">
      <Wallet className="w-12 h-12 text-zinc-400" />
      <h2 className="text-xl font-semibold">Connect Your Wallet</h2>
      <p className="text-zinc-400 text-center max-w-md">
        Please connect your wallet to access this section
      </p>
      <ConnectWalletButton />
    </div>
  );
} 