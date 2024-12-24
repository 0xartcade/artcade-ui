import { getDefaultConfig } from 'connectkit';
import { createConfig, http } from 'wagmi';
import {
  mainnet,
  sepolia,
  shape,
  shapeSepolia,
} from 'wagmi/chains';
import { isTestnet } from './config';
import { createStorage } from 'wagmi';

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;

// Create storage with proper this binding for localStorage
const storage = createStorage({
  storage: typeof window !== 'undefined' 
    ? {
        getItem: (key) => window.localStorage.getItem(key),
        setItem: (key, value) => window.localStorage.setItem(key, value),
        removeItem: (key) => window.localStorage.removeItem(key),
      }
    : undefined
});

const defaultConfig = getDefaultConfig({
  appName: '0xArtcade',
  appDescription:
    'Gameified art discovery',
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  transports: {
    // RPC URL for each chain
    /* ETH Main/Test */
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${alchemyId}`),
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${alchemyId}`),
    /* Shape Main/Test */
    [shape.id]: http(`https://shape-mainnet.g.alchemy.com/v2/${alchemyId}`),
    [shapeSepolia.id]: http(`https://shape-sepolia.g.alchemy.com/v2/${alchemyId}`),
  },
  chains: isTestnet ? [shapeSepolia, sepolia] : [shape, mainnet],
  ssr: true,
  storage,
});

export const ensChain = mainnet;

export const web3Config = createConfig(defaultConfig);
