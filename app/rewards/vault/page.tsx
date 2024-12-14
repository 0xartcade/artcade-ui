"use client";

import { NFTImage } from "@/components/ui/nft-image";
import { Paragraph } from "@/components/ui/typography";
import Link from "next/link";

interface NFTMetadata {
  id: string;
  title: string;
  artist: string;
  tokenStandard: string;
}

//////////////////////////////////////////////////////
/// MOCK Vault DATA (Replace)
//////////////////////////////////////////////////////

const EXAMPLE_NFTS: NFTMetadata[] = [
  {
    id: "1",
    title: "Cosmic Dreams #1",
    artist: "Digital Dreamer",
    tokenStandard: "ERC-721",
  },
  {
    id: "2",
    title: "Abstract Realms #7",
    artist: "CryptoArtist",
    tokenStandard: "ERC-721",
  },
  {
    id: "3",
    title: "Neural Symphony #3",
    artist: "AI Visionary",
    tokenStandard: "ERC-721",
  },
  // Add more examples as needed for grid view
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `${i + 4}`,
    title: `Artwork #${i + 4}`,
    artist: "Artist Name",
    tokenStandard: "ERC-721",
  })),
];

const MarketplaceLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    target="_blank"
    className="text-xs px-2 py-1 rounded-md bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
  >
    {label}
  </Link>
);

export default function VaultPage() {
  return (
    <div className="text-center">
      <Paragraph>
        Check back later on what art you have earned as part of our rewards
        program!
      </Paragraph>
    </div>
  );
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {EXAMPLE_NFTS.map((nft) => (
          <div
            key={nft.id}
            className="flex flex-col rounded-xl overflow-hidden bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-900/70 transition-colors"
          >
            {/* NFT Image */}
            <div className="aspect-square bg-zinc-800/50">
              <NFTImage />
            </div>

            {/* NFT Info */}
            <div className="p-3 space-y-3">
              {/* Title Row */}
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className="font-medium truncate text-sm">{nft.title}</h3>
                  <p className="text-xs text-zinc-400">by {nft.artist}</p>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800/50 text-zinc-400 whitespace-nowrap">
                  {nft.tokenStandard}
                </span>
              </div>

              {/* Marketplace Links */}
              <div className="flex flex-wrap gap-1.5">
                <MarketplaceLink href="https://opensea.io" label="OpenSea" />
                <MarketplaceLink
                  href="https://magiceden.io"
                  label="Magic Eden"
                />
                <MarketplaceLink
                  href="https://etherscan.io"
                  label="Etherscan"
                />
                <MarketplaceLink href="https://arweave.org" label="Arweave" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
