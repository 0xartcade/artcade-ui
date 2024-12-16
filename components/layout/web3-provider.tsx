"use client";

import { web3Config } from "@/lib/web3config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, Theme, Mode } from "connectkit";
import { FC, ReactNode } from "react";
import { WagmiProvider } from "wagmi";

const connectKitTheme = {
  "--ck-font-family": '"Orbitron", sans-serif',
  "--ck-border-radius": "12px",
  "--ck-connectbutton-width": "480px",
  
  // Solid background with overlay
  "--ck-overlay-background": "rgba(0, 0, 0, 0.8)",
  "--ck-overlay-backdrop-filter": "blur(8px)",
  "--ck-modal-box-shadow": `
    0 0 0 1px rgba(82, 219, 255, 0.4),
    0 0 0 1px rgba(118, 55, 254, 0.4),
    0 0 0 1px rgba(255, 61, 220, 0.4),
    0 4px 12px rgba(0, 0, 0, 0.1),
    0 0 16px rgba(82, 219, 255, 0.15)
  `,
  
  // Solid backgrounds
  "--ck-body-background": "#18181B",
  "--ck-body-background-secondary": "#18181B",
  "--ck-body-background-tertiary": "#18181B",
  
  // Connected wallet dropdown styling
  "--ck-dropdown-background": "#18181B",
  "--ck-dropdown-box-shadow": `
    0 0 0 1px rgba(82, 219, 255, 0.4),
    0 0 0 1px rgba(118, 55, 254, 0.4),
    0 0 0 1px rgba(255, 61, 220, 0.4),
    0 4px 12px rgba(0, 0, 0, 0.1),
    0 0 16px rgba(82, 219, 255, 0.15)
  `,
  
  // Connected screen background
  "--ck-connectbutton-background": `
    radial-gradient(
      circle at center,
      rgba(82, 219, 255, 0.03) 0%,
      rgba(118, 55, 254, 0.02) 25%,
      rgba(255, 61, 220, 0.01) 50%,
      rgba(13, 13, 15, 0.4) 100%
    )
  `,
  "--ck-connectbutton-hover-background": `
    radial-gradient(
      circle at center,
      rgba(82, 219, 255, 0.04) 0%,
      rgba(118, 55, 254, 0.03) 25%,
      rgba(255, 61, 220, 0.02) 50%,
      rgba(13, 13, 15, 0.5) 100%
    )
  `,
  
  // Subtle border and glow
  "--ck-body-border-radius": "24px",
  "--ck-modal-border": "none",
  "--ck-modal-glow": `
    0 -2px 0 0 #52DBFF,
    2px 0 0 0 #7637FE,
    0 2px 0 0 #FF3DDC,
    -2px 0 0 0 #52DBFF,
    0 0 12px rgba(82, 219, 255, 0.3),
    0 0 12px rgba(118, 55, 254, 0.3),
    0 0 12px rgba(255, 61, 220, 0.3)
  `,
  
  // Container and font adjustments
  "--ck-modal-width": "520px",
  "--ck-modal-padding": "32px",
  "--ck-font-size": "15px",
  "--ck-modal-heading-font-size": "22px",
  
  // Text colors
  "--ck-body-color": "#fafafa",
  "--ck-body-color-muted": "#ffffff",
  "--ck-body-color-muted-hover": "#ffffff",
  "--ck-body-divider": "rgba(82, 219, 255, 0.05)",
  
  // Button styling with subtle gradient
  "--ck-primary-button-background": "linear-gradient(90deg, rgba(82, 219, 255, 0.9), rgba(118, 55, 254, 0.9), rgba(255, 61, 220, 0.9))",
  "--ck-primary-button-hover-background": "linear-gradient(90deg, #52DBFF, #7637FE, #FF3DDC)",
  "--ck-primary-button-border-radius": "12px",
  "--ck-primary-button-color": "#ffffff",
  "--ck-primary-button-box-shadow": `
    0 0 12px rgba(82, 219, 255, 0.2),
    0 0 8px rgba(118, 55, 254, 0.1)
  `,
  
  // Secondary button styling
  "--ck-secondary-button-background": "rgba(18, 18, 21, 0.3)",
  "--ck-secondary-button-hover-background": "rgba(28, 28, 32, 0.4)",
  "--ck-secondary-button-color": "#ffffff",
  "--ck-secondary-button-border-radius": "12px",
  "--ck-secondary-button-box-shadow": "0 0 8px rgba(82, 219, 255, 0.1)",
  
  // Wallet connection buttons
  "--ck-wallet-button-border-radius": "12px",
  "--ck-wallet-button-background": "linear-gradient(90deg, rgba(82, 219, 255, 0.1), rgba(118, 55, 254, 0.1), rgba(255, 61, 220, 0.1))",
  "--ck-wallet-button-hover-background": "linear-gradient(90deg, rgba(82, 219, 255, 0.2), rgba(118, 55, 254, 0.2), rgba(255, 61, 220, 0.2))",
  "--ck-wallet-button-color": "#ffffff",
  "--ck-wallet-button-hover-color": "#ffffff",
  "--ck-wallet-button-border": "1px solid rgba(82, 219, 255, 0.1)",
  "--ck-wallet-button-hover-border": "1px solid rgba(82, 219, 255, 0.2)",
  "--ck-wallet-button-box-shadow": "none",
  "--ck-wallet-button-hover-box-shadow": "0 0 12px rgba(82, 219, 255, 0.1)",
  "--ck-wallet-button-transition": "all 0.2s ease-in-out",
  
  // Focus and highlights
  "--ck-focus-color": "rgba(82, 219, 255, 0.4)",
  "--ck-modal-heading-font-weight": "600",
  "--ck-qr-border-radius": "16px",
  "--ck-qr-background": "rgba(13, 13, 15, 0.3)",
  "--ck-qr-border": "1px solid rgba(82, 219, 255, 0.1)",
  "--ck-qr-box-shadow": "0 0 12px rgba(82, 219, 255, 0.1)",
  
  // Dropdown and tooltip styling
  "--ck-dropdown-button-background": "rgba(18, 18, 21, 0.35)",
  "--ck-dropdown-button-hover-background": "rgba(28, 28, 32, 0.45)",
  "--ck-tooltip-background": "rgba(13, 13, 15, 0.4)",
  "--ck-tooltip-background-secondary": "rgba(18, 18, 21, 0.4)",
  "--ck-tooltip-border": "1px solid rgba(82, 219, 255, 0.1)",
  "--ck-tooltip-shadow": "0 0 12px rgba(82, 219, 255, 0.1)",
  "--ck-tooltip-border-radius": "12px",
  
  // Graphics and icons
  "--ck-graphic-primary-background": "linear-gradient(135deg, #52DBFF15, #7637FE15, #FF3DDC15)",
  "--ck-graphic-compass-background": "linear-gradient(135deg, #52DBFF15, #7637FE15, #FF3DDC15)",
  "--ck-graphic-primary-box-shadow": "0 0 12px rgba(82, 219, 255, 0.1)",
  
  // Text shadows for providers
  "--ck-wallet-button-text-shadow": "0 2px 4px rgba(0, 0, 0, 0.2)",
  
  // Connected account modal background
  "--ck-connectbutton-balance-background": `
    radial-gradient(
      circle at center,
      rgba(82, 219, 255, 0.03) 0%,
      rgba(118, 55, 254, 0.02) 25%,
      rgba(255, 61, 220, 0.01) 50%,
      rgba(13, 13, 15, 0.4) 100%
    )
  `,
  "--ck-connectbutton-balance-box-shadow": "0 0 12px rgba(82, 219, 255, 0.1)",
  "--ck-connectbutton-balance-hover-background": `
    radial-gradient(
      circle at center,
      rgba(82, 219, 255, 0.04) 0%,
      rgba(118, 55, 254, 0.03) 25%,
      rgba(255, 61, 220, 0.02) 50%,
      rgba(13, 13, 15, 0.5) 100%
    )
  `,
  "--ck-connectbutton-balance-hover-box-shadow": "0 0 12px rgba(82, 219, 255, 0.2)",
  "--ck-connectbutton-balance-color": "#ffffff",
  "--ck-connectbutton-balance-border": "1px solid rgba(82, 219, 255, 0.1)",
  "--ck-connectbutton-balance-hover-border": "1px solid rgba(82, 219, 255, 0.2)",
} as const;

const connectKitProps = {
  theme: "custom" as Theme,
  mode: "dark" as Mode,
  customTheme: connectKitTheme,
  options: {
    hideBalance: false,
    hideTooltips: false,
    hideQuestionMarkCTA: true,
    enforceSupportedChains: true,
  },
} as const;

const queryClient = new QueryClient();

export const Web3Provider: FC<{ children?: ReactNode }> = ({ children }) => (
  <>
    <WagmiProvider config={web3Config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider {...connectKitProps}>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </>
);
