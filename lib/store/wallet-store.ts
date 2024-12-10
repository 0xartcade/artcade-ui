import { create } from 'zustand'

type WalletState = {
  isConnected: boolean
  address: string | null
  connect: () => void
  disconnect: () => void
}

export const useWalletStore = create<WalletState>((set) => ({
  isConnected: false,
  address: null,
  connect: () => set({ isConnected: true, address: '0x2fe4689436941b9fa078b50d1f88e556738b723e' }),
  disconnect: () => set({ isConnected: false, address: null }),
})) 