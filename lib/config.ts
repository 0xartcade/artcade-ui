export const isTestnet = process.env.NEXT_PUBLIC_IS_TESTNET === 'true';
export const appChainId = isTestnet ? 11011 : 360;
export const ticketContractAddress = isTestnet ? "0xc79cc5899e5a0ee96705555d5cbde42e940e25c6" : "";
export const ticketTokenId = isTestnet ? 1 : 1;
export const artcadeAddress = isTestnet ? "0xf341c443E331Dc9CD816FeBeBC88472F1bac480d" : "";
export const multicallAddress = isTestnet ? "0xcA11bde05977b3631167028862bE2a173976CA11" : "0xcA11bde05977b3631167028862bE2a173976CA11";
export const blockExplorerUrl = isTestnet ? "https://explorer-sepolia.shape.network" : "https://shapescan.xyz";