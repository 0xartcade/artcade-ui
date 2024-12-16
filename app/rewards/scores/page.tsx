"use client";

import { Button } from "@/components/ui/button";
import { GameScore } from "../../../components/ui/game-score";
import { useCallback, useMemo, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { SubHeading, Paragraph, Caption } from "@/components/ui/typography";
import { PacmanLoader } from "react-spinners";
import { motion } from "framer-motion";
import { TicketCheckIcon } from "lucide-react";
import {
  readContract,
  switchChain,
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";
import { web3Config } from "@/lib/web3config";
import { encodeFunctionData, parseAbi } from "viem";
import {
  appChainId,
  artcadeAddress,
  isTestnet,
  multicallAddress,
} from "@/lib/config";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAccount } from "wagmi";

export default function ScoresPage() {
  const [selectedScores, setSelectedScores] = useState<Set<number>>(new Set());
  const [submissionState, setSubmissionState] = useState("Preparing data...");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useAuth();
  const { address, chainId } = useAccount();
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["scores", user?.username],
    queryFn: async ({ pageParam }) => {
      const response = await api.getScores({ offset: pageParam });
      if (!response.success) {
        toast.error(response.error);
        throw new Error(response.error);
      }
      return response.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      lastPage?.next ? pages.length : undefined,
  });

  const onLoadMoreClick = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const scores = useMemo(() => {
    return data?.pages?.map((d) => (d ? d.results : [])).flat() || [];
  }, [data]);

  const toggleScore = (id: number, checked: boolean) => {
    const newSelected = new Set(selectedScores);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedScores(newSelected);
  };

  async function submitScore() {
    // get ui ready
    setSubmissionState("Processing data...");
    setDialogOpen(true);

    // get scores
    const scoresToSign = [...selectedScores];
    if (scoresToSign.length === 0) {
      toast.info("No scores selected!");
      return;
    }

    // sign scores on the backend
    const signedScores = await api.signScores(scoresToSign);
    if (!signedScores.success) {
      toast.error(signedScores.error);
      return;
    }

    if (chainId !== appChainId) {
      await switchChain(web3Config, { chainId: appChainId });
    }

    try {
      // get price per entry
      const artcadeSettings = await readContract(web3Config, {
        address: artcadeAddress as `0x${string}`,
        abi: parseAbi([
          "function getSettings() external view returns ((uint256 pricePerGame, uint256 maxTicketPerGame, address ticketAddress, uint256 ticketTokenId, address protocolFeeRecipient, uint256 protocolFeeBps, address weth, address gameImplementationAddress, address universalDeployer, string contractType, uint256 versionIndex))",
        ]),
        functionName: "getSettings",
        chainId: appChainId,
      });

      // create multicall data
      const txs: {
        target: `0x${string}`;
        value: bigint;
        calldata: `0x${string}`;
      }[] = [];

      // for each game in the scores, check if the user has registered. If not, add to the beginning of the txs
      const gameAddresses = [
        ...new Set(signedScores.data!.map((s) => s.game_address)),
      ];
      for (let i = 0; i < gameAddresses.length; i++) {
        const playerNftTokenId = await readContract(web3Config, {
          address: gameAddresses[i],
          abi: parseAbi([
            "function getPlayerNft(address player) external view returns (uint256)",
          ]),
          functionName: "getPlayerNft",
          args: [user!.eth_address],
        });
        if (playerNftTokenId === BigInt(0)) {
          // build data needed for registration
          const calldata = encodeFunctionData({
            abi: parseAbi(["function registerPlayer(address player) external"]),
            functionName: "registerPlayer",
            args: [user!.eth_address],
          });
          txs.push({
            target: gameAddresses[i],
            value: BigInt(0),
            calldata: calldata,
          });
        }
      }

      // build multicall data for the scores
      for (let i = 0; i < signedScores.data!.length; i++) {
        const calldata = encodeFunctionData({
          abi: parseAbi([
            "function submitScore(address player, uint256 score, bytes32 nonce, bytes calldata signature) external payable",
          ]),
          functionName: "submitScore",
          args: [
            signedScores.data![i].player,
            BigInt(signedScores.data![i].score),
            signedScores.data![i].nonce,
            signedScores.data![i].signature,
          ],
        });
        txs.push({
          target: signedScores.data![i].game_address,
          value: artcadeSettings.pricePerGame,
          calldata: calldata,
        });
      }

      // build tx data
      const call3Values = txs.map(({ target, value, calldata }) => ({
        target,
        allowFailure: false,
        value,
        callData: calldata,
      }));

      const totalValue = txs.reduce(
        (prevValue, { value }) => prevValue + value,
        BigInt(0)
      );

      // submit scores on the blockchain
      setSubmissionState("Waiting for user to sign transaction...");
      const txHash = await writeContract(web3Config, {
        address: multicallAddress as `0x${string}`,
        abi: parseAbi([
          "struct Result { bool success; bytes returnData; }",
          "struct Call3Value { address target; bool allowFailure; uint256 value; bytes callData; }",
          "function aggregate3Value(Call3Value[] calldata calls) public payable returns (Result[] memory returnData)",
        ]),
        chainId: appChainId,
        functionName: "aggregate3Value",
        value: totalValue,
        args: [call3Values],
      });

      // wait for transaction to process
      setSubmissionState("Waiting for transaction to process...");
      const { status } = await waitForTransactionReceipt(web3Config, {
        hash: txHash,
      });

      if (status === "reverted") {
        toast.error("Transaction reverted, please try again.");
        setDialogOpen(false);
        return;
      }

      // delete scores
      setSubmissionState("Performing score cleanup...");
      const r = await api.deletedScores(scoresToSign);

      queryClient.invalidateQueries({ queryKey: ["scores", user?.username] });

      setSelectedScores(new Set());

      // success
      setSubmissionState("Success!");
    } catch (e) {
      setDialogOpen(false);
      const knownPhrases = [
        {
          phrase: "User rejected the request",
          message: "",
        },
        {
          phrase:
            "The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account",
          message: "Insufficient funds, please bridge some ETH!",
        },
      ];
      // @ts-expect-error it just fails okay?
      if (!knownPhrases.some((phrase) => e.message.includes(phrase.phrase))) {
        console.error(e);
        toast.error("Something unexpected happened, please try again.");
      } else {
        knownPhrases.forEach((phrase) => {
          // @ts-expect-error it just fails okay?
          if (e.message.includes(phrase.phrase) && phrase.message) {
            toast.error(phrase.message);
          }
        });
      }
    }
  }

  return (
    <div className="flex flex-col space-y-8">
      {/* Introduction Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center space-y-6"
      >
        <div className="relative">
          <SubHeading className="font-orbitron text-xl text-white uppercase tracking-wider">
            Your Game Scores
          </SubHeading>
          <motion.div
            layoutId="sectionUnderline"
            className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-artcade-aqua to-artcade-purple"
          />
        </div>
        <div className="max-w-2xl">
          <Paragraph className="artcade-text">
            Submit your scores on-chain to earn tickets and climb the
            leaderboard.
          </Paragraph>
        </div>
        {isTestnet && (
          <Caption>
            Looking for testnet eth?{" "}
            <Link
              href="https://www.alchemy.com/faucets/ethereum-sepolia"
              className="underline underline-offset-4"
            >
              Get some Sepolia ETH
            </Link>{" "}
            and then{" "}
            <Link
              href="https://testnets.relay.link/bridge/shape-sepolia?fromChainId=11155111&fromCurrency=0x0000000000000000000000000000000000000000&toCurrency=0x0000000000000000000000000000000000000000"
              className="underline underline-offset-4"
            >
              bridge it to Shape Sepolia
            </Link>
            .
          </Caption>
        )}
      </motion.div>

      {/* Scores Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {scores.length > 0 ? (
          <>
            <div className="flex justify-center mb-8">
              <AlertDialog open={dialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="retro"
                    size="lg"
                    disabled={selectedScores.size === 0}
                    onClick={submitScore}
                    className="font-orbitron"
                  >
                    Submit Scores Onchain
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-black/90 backdrop-blur-sm border border-white/10">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="font-orbitron text-lg text-white uppercase tracking-wider">
                      Submit Scores Onchain
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <div className="flex flex-col items-center py-10">
                    {submissionState !== "Success!" ? (
                      <PacmanLoader size={64} color="#cccccc" />
                    ) : (
                      <>
                        <TicketCheckIcon
                          className="w-32 h-32"
                          style={{
                            stroke: "url(#artcade-gradient)",
                          }}
                        />
                        <svg width="0" height="0">
                          <linearGradient
                            id="artcade-gradient"
                            gradientTransform=""
                          >
                            <stop offset="0%" stopColor="#52DBFF" />
                            <stop offset="100%" stopColor="#7637FE" />
                          </linearGradient>
                        </svg>
                      </>
                    )}
                    <Paragraph className="font-orbitron text-sm text-white mt-4">
                      {submissionState}
                    </Paragraph>
                    {submissionState === "Success!" && (
                      <div className="flex gap-x-2 mt-4">
                        <Button
                          variant="ghost"
                          onClick={() => setDialogOpen(false)}
                          className="absolute top-4 right-4"
                        >
                          Close
                        </Button>
                        <Link href="/leaderboard">
                          <Button variant="retro">View Leaderboards</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {scores.map((score, index) => (
                <motion.div
                  key={score.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <GameScore
                    gameName={score.game.name}
                    date={score.created_at}
                    score={score.score}
                    isSelected={selectedScores.has(score.id)}
                    onSelect={(checked) => toggleScore(score.id, checked)}
                    gameId={score.game.id}
                  />
                </motion.div>
              ))}
              {hasNextPage && (
                <Button variant="outline" onClick={onLoadMoreClick}>
                  Load More
                </Button>
              )}
            </div>
            {hasNextPage && (
              <div className="flex justify-center mt-6">
                <Button variant="retro" onClick={onLoadMoreClick}>
                  Load More
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center space-y-6 mt-8">
            <Paragraph className="font-orbitron text-sm text-white">
              Looks like you haven&apos;t played any games!
            </Paragraph>
            <Link href="/games">
              <Button variant="retro">Veiw Leaderboards</Button>
            </Link>
            <Link href="/games">
              <Button variant="outline">Discover Games</Button>
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
