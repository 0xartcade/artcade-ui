"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { User } from "./types";
import { useAccount } from "wagmi";
import { api } from "./api";
import { createSiweMessage } from "viem/siwe";
import { signMessage } from "wagmi/actions";
import { web3Config } from "./web3config";
import { toast } from "sonner";
import { ConnectWalletPrompt } from "@/components/ui/connect-wallet";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);
  const { address, chainId } = useAccount();

  const login = async () => {
    if (!address) {
      return;
    }

    if (user) {
      if (user.eth_address.toLowerCase() !== address?.toLowerCase()) {
        logout();
      } else {
        return;
      }
    }

    if (!chainId) {
      toast.error("ChainId not specified");
      return;
    }

    try {
      // get nonce
      const nonceResponse = await api.getNonce();
      if (!nonceResponse.success) {
        toast.error(nonceResponse.error);
        return;
      }

      // sign message
      const msg = createSiweMessage({
        address,
        chainId: chainId,
        domain: window.location.host,
        nonce: nonceResponse.data!,
        uri: window.location.origin,
        version: "1",
        statement:
          "0xArtcade is asking for your signature to verify your ownership of your digital wallet.",
      });

      const signature = await signMessage(web3Config, {
        message: msg,
        account: address,
      });

      // login
      const loginResponse = await api.login(msg, signature);
      if (!loginResponse.success) {
        toast.error(loginResponse.error);
        return;
      }
      setUser(loginResponse.data?.user as User);
      setIsAuthenticated(true);
    } catch (e) {
      setIsAuthenticated(false);
      setUser(null);
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
        // @ts-expect-error it just fails okay?
        toast.error(e.message);
      } else {
        knownPhrases.forEach((phrase) => {
          // @ts-expect-error it just fails okay?
          if (e.message.includes(phrase.phrase) && phrase.message) {
            toast.error(phrase.message);
          }
        });
      }
    }
  };

  const logout = async () => {
    if (user) {
      const r = await api.logout();
      if (!r.success) {
        toast.error(r.error);
      }
    }
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    // initialize
    api.getUserInfo().then((res) => {
      if (res.success) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
      setInitialized(true);
    });
  }, []);

  useEffect(() => {
    if (!initialized) return;

    if (address) {
      // login
      login();
    } else {
      // logout
      logout();
    }
  }, [address, initialized]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function withAuth<T extends object>(Component: React.ComponentType<T>) {
  return function AuthenticatedRoute(props: T) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
      return <ConnectWalletPrompt />;
    }

    return <Component {...props} />;
  };
}
