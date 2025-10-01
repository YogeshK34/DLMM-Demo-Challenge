
import './App.css';
import { WalletContextProvider } from './components/WalletProvider';
import { Header } from './components/Header';
import { PortfolioSummary } from './components/PortfolioSummary';
import { PositionsList } from './components/PositionsList';
import { AnalyticsCharts } from './components/AnalyticsCharts';

// Mock data for charts
const mockChartData = [
  { date: '2024-01-01', liquidity: 10000, fees: 50, volume: 25000 },
  { date: '2024-01-02', liquidity: 12000, fees: 75, volume: 30000 },
  { date: '2024-01-03', liquidity: 15000, fees: 90, volume: 35000 },
  { date: '2024-01-04', liquidity: 18000, fees: 110, volume: 28000 },
  { date: '2024-01-05', liquidity: 20000, fees: 125, volume: 42000 },
  { date: '2024-01-06', liquidity: 22000, fees: 140, volume: 38000 },
  { date: '2024-01-07', liquidity: 26400, fees: 227, volume: 45000 },
];

function App() {
  return (
    <WalletContextProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="p-8">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">Portfolio Overview</h1>
            <p className="text-gray-600">DeFi Portfolio Analytics for DLMM Liquidity Providers</p>
          </div>
        
          <PortfolioSummary
            totalLiquidity={26400}
            totalFeesEarned={227.75}
            averageAPR={15.4}
            totalPositions={3}
          />
          
          <div className="mt-8">
            <AnalyticsCharts data={mockChartData} />
          </div>
          
          <div className="mt-8">
            <PositionsList />
          </div>
          
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Welcome to Saros DLMM Analytics
            </h2>
            <p className="text-gray-600 mb-4">
              This is a portfolio analytics dashboard for Saros DLMM (Dynamic Liquidity Market Maker) 
              liquidity providers. Connect your wallet to view your positions and analytics.
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors">
              Connect Wallet (Demo)
            </button>
          </div>
        </div>
      </div>
    </WalletContextProvider>
  );
}

export default App
