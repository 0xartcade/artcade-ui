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
  connect: () => set({ isConnected: true, address: '0x1234...5678' }),
  disconnect: () => set({ isConnected: false, address: null }),
})) 