import React from 'react';
import { DollarSign, TrendingUp, Percent, BarChart3 } from 'lucide-react';

interface PortfolioSummaryProps {
  totalLiquidity: number;
  totalFeesEarned: number;
  averageAPR: number;
  totalPositions: number;
}

export const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
  totalLiquidity,
  totalFeesEarned,
  averageAPR,
  totalPositions
}) => {
  const stats = [
    {
      name: 'Total Liquidity',
      value: `$${totalLiquidity.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Fees Earned',
      value: `$${totalFeesEarned.toFixed(2)}`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Average APR',
      value: `${averageAPR.toFixed(1)}%`,
      icon: Percent,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      name: 'Active Positions',
      value: totalPositions.toString(),
      icon: BarChart3,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white overflow-hidden shadow-md rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`p-3 rounded-md ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {stat.value}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};