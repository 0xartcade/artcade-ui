import { getDefaultConfig } from 'connectkit';
import { createConfig, http } from 'wagmi';
import {
  mainnet,
  sepolia,
  shape,
  shapeSepolia,
} from 'wagmi/chains';
import { isTestnet } from './config';

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;

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
});

export const ensChain = mainnet;

export const web3Config = createConfig(defaultConfig);
