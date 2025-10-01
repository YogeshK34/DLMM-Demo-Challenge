import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

interface ChartData {
  date: string;
  liquidity: number;
  fees: number;
  volume: number;
}

interface AnalyticsChartsProps {
  data: ChartData[];
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Liquidity & Fees Over Time */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Liquidity & Fees Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [
                `$${Number(value).toLocaleString()}`,
                name === 'liquidity' ? 'Liquidity' : 'Fees Earned'
              ]}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="liquidity" 
              stroke="#3B82F6" 
              strokeWidth={2}
              name="Liquidity"
            />
            <Line 
              type="monotone" 
              dataKey="fees" 
              stroke="#10B981" 
              strokeWidth={2}
              name="Fees Earned"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Daily Volume */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Daily Trading Volume
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Volume']}
            />
            <Legend />
            <Bar 
              dataKey="volume" 
              fill="#8B5CF6" 
              name="Volume"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};