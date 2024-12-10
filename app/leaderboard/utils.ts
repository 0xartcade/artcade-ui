// Base addresses for consistent hydration per game
const BASE_ADDRESSES = [
  "0x2fe4689436941b9fa078b50d1f88e556738b723e",
  "0x7c23e1ef0b19d71cbb08c8b2137e0252c3d4cd8a",
  "0x9d8a7b4c2e3f1a0b5c6d8e9f7a2b3c4d5e6f7890",
  "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
  "0xabcdef1234567890abcdef1234567890abcdef12",
  "0x123456789abcdef123456789abcdef123456789a",
  "0x987654321fedcba987654321fedcba987654321f",
  "0xfedcba987654321fedcba987654321fedcba9876",
  "0xa1b2c3d4e5f67890123456789abcdef012345678",
  "0xb2c3d4e5f67890a123456789abcdef0123456789",
  "0xc3d4e5f67890ab12345678901234567890abcdef",
  "0xd4e5f67890abc123456789012345678901234567",
  "0xe5f67890abcd1234567890123456789012345678",
  "0xf67890abcde12345678901234567890123456789",
  "0x7890abcdef123456789012345678901234567890",
  "0x90abcdef1234567890123456789012345678901a",
  "0xabcdef12345678901234567890123456789012bc",
  "0xcdef123456789012345678901234567890123def",
  "0xef12345678901234567890123456789012345678",
  "0xf123456789012345678901234567890123456789",
  "0x23456789012345678901234567890123456789ab",
  "0x456789012345678901234567890123456789abcd",
  "0x6789012345678901234567890123456789abcdef",
  "0x89012345678901234567890123456789abcdef12",
  "0x012345678901234567890123456789abcdef1234"
];

function shuffleArray<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor((seed * (i + 1)) % (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getMockLeaderboardData(gameId?: string) {
  const seed = gameId ? parseInt(gameId.split('-')[1]) : 1;
  const shuffledAddresses = shuffleArray(BASE_ADDRESSES, seed);
  
  return shuffledAddresses.map((address, index) => ({
    rank: index + 1,
    name: `0xArcade User ${index + 1}`,
    address,
    tickets: Math.max(25000 - (index * 850), 1000),
  }));
} 