import { Gamepad2Icon } from "lucide-react";
import { SubHeading2, Paragraph } from "./typography";
import Button from "./button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ConnectWalletButton } from "./connect-button";
import { useAuth } from "@/lib/auth-context";

interface GameCardProps {
  name: string;
  description: string;
  gameType: string;
  collaborator?: string;
  url?: string;
  ctaName?: string;
  thumbnail?: string;
  isSelected?: boolean;
  requiresAuth?: boolean;
}

export function GameCard({
  name,
  description,
  gameType,
  collaborator,
  url,
  ctaName = "Play Now",
  thumbnail,
  isSelected,
  requiresAuth,
}: GameCardProps) {
  const { isAuthenticated } = useAuth();

  const renderButton = () => {
    if (requiresAuth && !isAuthenticated) {
      return <ConnectWalletButton />;
    }

    if (!url) {
      return (
        <Button variant="retro" size="lg" className="font-orbitron w-36 opacity-50" disabled>
          COMING SOON
        </Button>
      );
    }

    return (
      <Link href={url}>
        <Button variant="retro" size="lg" className="font-orbitron w-36">
          {ctaName}
        </Button>
      </Link>
    );
  };

  return (
    <div
      className={cn(
        "artcade-container-horizontal group relative overflow-hidden",
        isSelected && "artcade-selected"
      )}
    >
      <div className="artcade-hover-gradient" />
      <div className="artcade-hover-sweep" />
      <div className="absolute inset-4 bg-zinc-900 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
        <div className="flex h-full">
          {/* Game Icon/Thumbnail */}
          <div className="relative hidden md:flex min-w-52 h-full items-center justify-center bg-zinc-900/60 backdrop-blur-sm rounded-xl overflow-hidden p-3">
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt={name}
                width={208}
                height={144}
                className="w-full h-full object-cover rounded-xl"
                priority
              />
            ) : (
              <Gamepad2Icon className="w-8 h-8 text-zinc-400" />
            )}
          </div>

          {/* Game Info */}
          <div className="relative flex-1 flex flex-col justify-center min-w-0 py-2 px-8">
            <div className="flex items-center gap-4">
              <div>
                <SubHeading2 className="font-orbitron text-xl text-white tracking-wide uppercase leading-none">
                  {name}
                </SubHeading2>
              </div>
              {collaborator && (
                <span className="hidden md:inline text-xs uppercase tracking-wider px-2 py-1 rounded-full bg-artcade-aqua text-white flex-none">
                  {collaborator}
                </span>
              )}
              <span className="hidden md:inline text-xs uppercase tracking-wider px-2 py-1 rounded-full bg-artcade-purple text-white flex-none">
                {gameType}
              </span>
            </div>
            <div className="hidden md:block">
              <Paragraph
                noMargin
                className="text-zinc-400 text-base leading-tight mt-2 line-clamp-3"
              >
                {description}
              </Paragraph>
            </div>
          </div>

          {/* Play Button */}
          <div className="relative h-full flex items-center justify-center px-8">
            {renderButton()}
          </div>
        </div>
      </div>
    </div>
  );
}
