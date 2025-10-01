# SDK Integration Guide

This guide explains how to integrate Saros SDKs with your application.

## Frontend Integration (@saros-finance/dlmm-sdk)

### Installation

```bash
npm install @saros-finance/dlmm-sdk @saros-finance/sdk
```

### Basic Usage

```typescript
import { DLMM } from '@saros-finance/dlmm-sdk';
import { Connection } from '@solana/web3.js';

// Initialize connection
const connection = new Connection('https://api.devnet.solana.com');

// Initialize DLMM
const dlmm = new DLMM(connection, wallet);

// Fetch positions
const positions = await dlmm.getPositions(wallet.publicKey);
```

### Wallet Integration

```typescript
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

export function usePositions() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  
  const fetchPositions = async () => {
    if (!publicKey) return [];
    
    const dlmm = new DLMM(connection, wallet);
    return await dlmm.getPositions(publicKey);
  };
  
  return { fetchPositions };
}
```

### Advanced Features

#### Creating Positions
```typescript
const createPosition = async (poolId: string, lowerBin: number, upperBin: number, amount: number) => {
  const position = await dlmm.createPosition({
    poolId,
    lowerBin,
    upperBin,
    amount
  });
  return position;
};
```

#### Removing Liquidity
```typescript
const removeLiquidity = async (positionId: string, percentage: number) => {
  const transaction = await dlmm.removeLiquidity({
    positionId,
    percentage
  });
  return transaction;
};
```

## Backend Integration (saros-dlmm-sdk-rs)

### Installation

Add to your `Cargo.toml`:

```toml
[dependencies]
# saros-dlmm-sdk-rs = "0.1"  # Uncomment when available
solana-client = "1.18"
solana-sdk = "1.18"
```

### Basic Usage

```rust
use saros_dlmm_sdk_rs::{DLMM, DLMMConfig};
use solana_client::rpc_client::RpcClient;

// Initialize client
let rpc_client = RpcClient::new("https://api.devnet.solana.com");
let dlmm = DLMM::new(&rpc_client, DLMMConfig::default());

// Fetch positions
let positions = dlmm.get_positions(&wallet_pubkey).await?;
```

### Analytics Integration

```rust
use saros_dlmm_sdk_rs::analytics::{PortfolioAnalyzer, AnalyticsConfig};

let analyzer = PortfolioAnalyzer::new(
    &rpc_client,
    AnalyticsConfig {
        historical_days: 30,
        include_fees: true,
        include_volume: true,
    }
);

let metrics = analyzer.calculate_portfolio_metrics(&positions).await?;
```

## Environment Variables

### Frontend (.env.local)

```bash
# Solana Configuration
VITE_SOLANA_NETWORK=devnet
VITE_SOLANA_RPC_URL=https://api.devnet.solana.com

# Backend API
VITE_API_BASE_URL=http://localhost:8080

# Saros Configuration
VITE_SAROS_PROGRAM_ID=your_program_id
```

### Backend (.env)

```bash
# Server Configuration
HOST=0.0.0.0
PORT=8080

# Solana Configuration
SOLANA_NETWORK=devnet
SOLANA_RPC_URL=https://api.devnet.solana.com

# Saros SDK Configuration
SAROS_PROGRAM_ID=your_program_id
```

## Error Handling

### Frontend

```typescript
try {
  const positions = await dlmm.getPositions(publicKey);
} catch (error) {
  if (error.code === 'WALLET_NOT_CONNECTED') {
    // Handle wallet not connected
  } else if (error.code === 'INSUFFICIENT_FUNDS') {
    // Handle insufficient funds
  } else {
    // Handle other errors
    console.error('DLMM Error:', error);
  }
}
```

### Backend

```rust
match dlmm.get_positions(&wallet_pubkey).await {
    Ok(positions) => Ok(positions),
    Err(DLMMError::WalletNotFound) => {
        // Handle wallet not found
        Ok(vec![])
    },
    Err(e) => {
        tracing::error!("Failed to fetch positions: {}", e);
        Err(e.into())
    }
}
```

## Testing

### Unit Tests

```typescript
// Frontend tests
import { DLMM } from '@saros-finance/dlmm-sdk';

describe('DLMM Integration', () => {
  it('should fetch positions', async () => {
    const dlmm = new DLMM(mockConnection, mockWallet);
    const positions = await dlmm.getPositions(mockPublicKey);
    expect(positions).toHaveLength(3);
  });
});
```

```rust
// Backend tests
#[tokio::test]
async fn test_fetch_positions() {
    let dlmm = DLMM::new(&mock_rpc_client(), DLMMConfig::default());
    let positions = dlmm.get_positions(&test_wallet_pubkey()).await.unwrap();
    assert!(!positions.is_empty());
}
```

## Production Deployment

### Frontend (Vercel/Netlify)

```bash
# Build
npm run build:frontend

# Deploy dist/ folder to your hosting provider
```

### Backend (Docker)

```dockerfile
FROM rust:1.70 as builder
WORKDIR /app
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
COPY --from=builder /app/target/release/server /usr/local/bin/server
EXPOSE 8080
CMD ["server"]
```

## Troubleshooting

### Common Issues

1. **Wallet Connection Errors**
   - Ensure wallet adapter is properly configured
   - Check network compatibility

2. **RPC Errors**
   - Verify RPC endpoint is accessible
   - Check rate limits

3. **Transaction Failures**
   - Ensure sufficient SOL for fees
   - Check slippage settings

4. **Position Fetch Failures**
   - Verify wallet has DLMM positions
   - Check program ID configuration