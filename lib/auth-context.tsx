'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ConnectWalletButton } from '@/components/ui/connect-wallet';
import { InfoPanel } from '@/components/layout/info-panel';
import { useWalletStore } from '@/lib/wallet-store';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { address } = useWalletStore();

  useEffect(() => {
    setIsAuthenticated(!!address);
  }, [address]);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function withAuth<T extends object>(Component: React.ComponentType<T>) {
  return function AuthenticatedRoute(props: T) {
    const { isAuthenticated } = useAuth();
    const { address } = useWalletStore();

    if (!isAuthenticated || !address) {
      return (
        <InfoPanel>
          <div className="h-full flex flex-col">
            <div className="flex-1 flex items-center justify-center min-h-[400px]">
              <div className="text-center space-y-4">
                <h2 className="text-xl text-zinc-400 mb-4">Connect your wallet to continue</h2>
                <ConnectWalletButton />
              </div>
            </div>
          </div>
        </InfoPanel>
      );
    }

    return <Component {...props} />;
  };
} 