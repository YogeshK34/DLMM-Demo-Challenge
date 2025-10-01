# Saros DLMM Portfolio Dashboard

A full-stack DeFi portfolio analytics dashboard for Saros DLMM (Dynamic Liquidity Market Maker) liquidity providers. Built with React TypeScript frontend and Rust backend, showcasing real-world integration with Saros SDKs.

## 🚀 Features

- **Portfolio Analytics**: Real-time tracking of DLMM LP positions
- **Fee Analytics**: Historical fee earnings and yield calculations
- **Bin Distribution**: Visual representation of liquidity distribution across price bins
- **Impermanent Loss Tracking**: Monitor IL across different market conditions
- **Strategy Simulator**: Backtest different LP strategies
- **Advanced Orders**: Limit/Stop-loss orders using DLMM bins
- **Multi-Wallet Support**: Phantom, Solflare, and other Solana wallets

## 🏗️ Architecture

```
├── frontend/          # React TypeScript app with Saros DLMM SDK
├── backend/           # Rust service with saros-dlmm-sdk-rs
├── docs/             # Documentation and guides
└── examples/         # Usage examples and tutorials
```

## 🛠️ Tech Stack

### Frontend
- **React** with **TypeScript**
- **Vite** for fast development
- **@saros-finance/dlmm-sdk** - DLMM operations
- **@saros-finance/sdk** - AMM, Stake, Farm operations
- **@solana/wallet-adapter** - Wallet connectivity
- **Recharts** - Data visualization
- **Tailwind CSS** - Styling

### Backend
- **Rust** with **Axum** web framework
- **saros-dlmm-sdk-rs** - Advanced analytics and simulations
- **PostgreSQL** - Data persistence
- **Redis** - Caching and real-time data

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Rust 1.70+ and Cargo
- PostgreSQL (optional, for persistence)

### Installation

1. **Clone and install dependencies:**
```bash
# Install root dependencies
npm install

# Install all workspace dependencies
npm run install:all
```

2. **Set up environment variables:**
```bash
# Copy environment templates
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

3. **Start development servers:**
```bash
# Run both frontend and backend
npm run dev

# Or run individually
npm run dev:frontend  # Frontend on http://localhost:5173
npm run dev:backend   # Backend on http://localhost:8080
```

## 📖 SDK Integration Examples

### Frontend: Fetch LP Positions
```typescript
import { DLMM } from '@saros-finance/dlmm-sdk';

const dlmm = new DLMM(connection, wallet);
const positions = await dlmm.getPositions(wallet.publicKey);
```

### Backend: Advanced Analytics
```rust
use saros_dlmm_sdk_rs::analytics::PortfolioAnalyzer;

let analyzer = PortfolioAnalyzer::new(connection);
let metrics = analyzer.calculate_portfolio_metrics(positions).await?;
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Frontend tests
npm run test:frontend

# Backend tests  
npm run test:backend
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build:frontend
# Deploy dist/ folder
```

### Backend (Docker)
```bash
docker build -t saros-analytics-backend ./backend
docker run -p 8080:8080 saros-analytics-backend
```

## 📚 Documentation

- [API Documentation](./docs/api.md)
- [SDK Integration Guide](./docs/sdk-integration.md)
- [Deployment Guide](./docs/deployment.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Acknowledgments

- [Saros Finance](https://saros.finance/) for the excellent DLMM SDK
- Solana ecosystem for the robust infrastructure
- Open source contributors and the DeFi community

---

**Built for the Saros Finance Bounty Program**# DLMM-Demo-Challenge
