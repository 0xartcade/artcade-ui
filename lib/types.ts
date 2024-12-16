export interface User {
  eth_address: `0x${string}`;
  username: string;
  created_at: string;
  updated_at: string;
}

export interface LoginData {
  token: string;
  expiry: string;
  user: User;
}

export interface Game {
  id: number;
  name: string;
  description: string;
  eth_address: `0x${string}`;
  url: string;
  nft_address: `0x${string}`;
  created_at: string;
  updated_at: string;
}

export interface Score {
  id: number;
  game: Game;
  score: number;
  created_at: string;
  updated_at: string;
}

export interface SignedScore {
  player: `0x${string}`;
  score: number;
  nonce: `0x${string}`;
  signature: `0x${string}`;
  game_address: `0x${string}`;
}

export interface LeaderboardEntry {
  username: string;
  eth_address: `0x${string}`;
  score: number;
  token_id: number;
  created_at: string;
  updated_at: string;
}

export type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  error: string;
}

export type Paginated<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
}