import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useWalletStore } from "@/lib/store/wallet-store"
import { Settings, LogOut } from "lucide-react"
import Link from "next/link"

// Example address from utils for development
const EXAMPLE_ADDRESS = "0x2fe4689436941b9fa078b50d1f88e556738b723e"

export function UserMenu() {
  const { disconnect, isConnected, address = EXAMPLE_ADDRESS } = useWalletStore()

  if (!isConnected) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-zinc-800">
          0xArtcade User 1
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[340px] p-2">
        <div className="px-2 py-2.5 text-xs font-mono text-zinc-400 break-all">
          {address}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="py-2.5">
          <Link href="/settings" className="flex items-center">
            <Settings className="mr-2.5 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={disconnect} className="text-red-500 py-2.5">
          <LogOut className="mr-2.5 h-4 w-4" />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 