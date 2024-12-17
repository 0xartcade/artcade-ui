import { abbreviateAddress } from "@/lib/utils";
import { ensChain } from "@/lib/web3config";
import { isAddress } from "viem";
import { useEnsName } from "wagmi";

export const AddressDisplay = ({ address }: { address: string }) => {
  const { data: ensName } = useEnsName({
    address: isAddress(address.toLowerCase())
      ? (address as `0x${string}`)
      : undefined,
    chainId: ensChain.id,
  });

  return ensName || abbreviateAddress(address);
};
