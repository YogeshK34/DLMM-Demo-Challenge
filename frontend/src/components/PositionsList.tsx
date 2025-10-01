import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';

interface Position {
  id: string;
  pair: string;
  liquidity: number;
  feesEarned: number;
  impermanentLoss: number;
  apr: number;
  status: 'active' | 'inactive';
}

export const PositionsList: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (connected && publicKey) {
      fetchPositions();
    }
  }, [connected, publicKey]);

  const fetchPositions = async () => {
    setLoading(true);
    try {
      // Mock data for now - replace with actual Saros SDK calls
      const mockPositions: Position[] = [
        {
          id: '1',
          pair: 'SOL/USDC',
          liquidity: 12500.50,
          feesEarned: 125.75,
          impermanentLoss: -2.3,
          apr: 15.4,
          status: 'active'
        },
        {
          id: '2', 
          pair: 'RAY/SOL',
          liquidity: 8300.25,
          feesEarned: 67.80,
          impermanentLoss: 1.2,
          apr: 18.7,
          status: 'active'
        },
        {
          id: '3',
          pair: 'ORCA/USDC',
          liquidity: 5600.00,
          feesEarned: 34.20,
          impermanentLoss: -0.8,
          apr: 12.1,
          status: 'inactive'
        }
      ];
      
      setPositions(mockPositions);
    } catch (error) {
      console.error('Error fetching positions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Connect Your Wallet
        </h2>
        <p className="text-gray-600">
          Connect your Solana wallet to view your DLMM positions and analytics.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading positions...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          Your DLMM Positions
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {positions.length} active positions
        </p>
      </div>

      {positions.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-gray-600">No DLMM positions found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pair
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Liquidity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fees Earned
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  APR
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {positions.map((position) => (
                <tr key={position.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {position.pair}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <DollarSign size={16} className="mr-1 text-gray-400" />
                      ${position.liquidity.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-green-600">
                      <TrendingUp size={16} className="mr-1" />
                      ${position.feesEarned.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center text-sm ${
                      position.impermanentLoss >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {position.impermanentLoss >= 0 ? (
                        <TrendingUp size={16} className="mr-1" />
                      ) : (
                        <TrendingDown size={16} className="mr-1" />
                      )}
                      {position.impermanentLoss >= 0 ? '+' : ''}{position.impermanentLoss}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-blue-600">
                      <Percent size={16} className="mr-1" />
                      {position.apr}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      position.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {position.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};