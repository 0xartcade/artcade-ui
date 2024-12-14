"use client";

import { web3Config } from "@/lib/web3config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";
import { FC, ReactNode } from "react";
import { WagmiProvider } from "wagmi";

const connectKitTheme = {
  colors: {
    accentColor: "#000",
  },
};

const connectKitProps = {
  theme: "default" as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  mode: "dark" as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  customTheme: connectKitTheme,
  // options: {
  //   disclaimer: (
  //     <>
  //       By connecting your wallet you agree to the{' '}
  //       <a target="_blank" rel="noopener noreferrer" href="">
  //         Terms of Service
  //       </a>{' '}
  //       and{' '}
  //       <a
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         href=""
  //       >
  //         Privacy Policy
  //       </a>
  //     </>
  //   ),
  // },
};

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
