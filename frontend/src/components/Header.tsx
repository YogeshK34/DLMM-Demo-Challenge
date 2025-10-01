import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton, WalletDisconnectButton } from './WalletProvider';

export const Header: React.FC = () => {
  const { connected } = useWallet();

  return (
    <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">
              Saros DLMM Portfolio
            </h1>
            <span className="text-sm text-purple-200">
              Analytics Dashboard
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {connected ? (
              <>
                <span className="text-green-400 text-sm font-medium">
                  Connected
                </span>
                <WalletDisconnectButton />
              </>
            ) : (
              <WalletMultiButton />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};