import { ConnectKitButton } from "connectkit";
import Button from "./button";

export const ConnectWalletButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address, ensName }) => {
        return (
          <Button variant="outline" onClick={show}>
            {isConnected
              ? ensName
                ? ensName
                : `${address?.slice(0, 6)}···${address?.slice(-4)}`
              : "Connect Wallet"}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
