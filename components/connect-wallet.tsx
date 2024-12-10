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

export function ConnectWalletButton() {
  const { connect, isConnected } = useWalletStore()

  if (isConnected) {
    return null
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
            onClick={connect}
            className="w-full justify-start gap-4"
            variant="outline"
          >
            <WalletIcon className="h-5 w-5" />
            MetaMask
          </Button>
          <Button
            onClick={connect}
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