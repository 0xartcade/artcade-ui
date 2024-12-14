export const isTestnet = process.env.NEXT_PUBLIC_IS_TESTNET === 'true';
export const ticketContractAddress = isTestnet ? "0xc79cc5899e5a0ee96705555d5cbde42e940e25c6" : "";
export const ticketTokenId = isTestnet ? 1 : 1;