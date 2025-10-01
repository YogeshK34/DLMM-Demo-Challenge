# Telegram Bot Example

This example shows how to create a Telegram bot for managing DLMM positions.

## Prerequisites

- Node.js 18+
- Telegram Bot Token (from @BotFather)
- Saros DLMM SDK

## Installation

```bash
npm install node-telegram-bot-api @saros-finance/dlmm-sdk @solana/web3.js
```

## Bot Features

- Check portfolio balance
- View active positions
- Create new positions
- Remove liquidity
- Set price alerts

## Usage

1. Set environment variables:
```bash
export TELEGRAM_BOT_TOKEN="your_bot_token"
export SOLANA_RPC_URL="https://api.devnet.solana.com"
```

2. Run the bot:
```bash
node telegram-bot.js
```

3. Commands:
- `/start` - Initialize bot
- `/balance` - Check portfolio
- `/positions` - View positions
- `/create` - Create position
- `/remove` - Remove liquidity
- `/alerts` - Set price alerts

## Implementation

See `telegram-bot.js` for full implementation.