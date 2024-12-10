'use client';

import { useAuth } from './auth-context';
import { useEffect } from 'react';
import { useConnectModal } from '@/hooks/use-connect-modal'; // Assuming you have this hook for your modal

export function withProtectedRoute<T extends object>(
  Component: React.ComponentType<T>
) {
  return function ProtectedRoute(props: T) {
    const { isAuthenticated } = useAuth();
    const { openConnectModal } = useConnectModal();

    useEffect(() => {
      if (!isAuthenticated) {
        openConnectModal();
      }
    }, [isAuthenticated, openConnectModal]);

    // Return the component regardless of auth state, 
    // but the modal will appear if not authenticated
    return <Component {...props} />;
  };
} 