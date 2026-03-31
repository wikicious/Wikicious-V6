# Wikicious V6

**The most advanced decentralised exchange on Arbitrum One.**

132 smart contracts · 295 markets · 106 features · Genesis Safe 2-of-3

## Project Structure

```
wikicious-v6/
├── contracts/          # Solidity smart contracts (132 files)
│   ├── src/           # All contract source files
│   ├── scripts/       # Deployment scripts
│   └── test/          # Test suite
├── frontend/          # React 18 + wagmi v2 web app
│   └── src/
│       ├── pages/     # 72 page components
│       ├── hooks/     # useContracts.js + useApi.js
│       └── store/     # Zustand state
├── mobile/            # Flutter 3.24 app (69 screens)
├── backend/           # Node.js API + keeper services
├── bots/              # Keeper bot strategies
├── admin/             # Admin panel HTML
└── docs/              # Deployment guide + showcase
```

## Quick Start

### Deploy Contracts
```bash
cd contracts
npm install
cp .env.example .env   # fill in your private key
npx hardhat run scripts/deploy.js --network arbitrum_sepolia  # testnet first!
npx hardhat run scripts/deploy.js --network arbitrum_one      # mainnet
```

### Start Backend
```bash
cd backend
npm install
npm start
```

### Start Frontend
```bash
cd frontend
npm install
npm start
```

## Key Addresses (Arbitrum One)
- USDC: `0xaf88d065e77c8cC2239327C5EDb3A432268e5831`
- Pyth Oracle: `0xff1a0f4744e8582DF1aE09D5611b887B6a12925C`
- LayerZero Endpoint: `0x1a44076050125825900e736c501f859c50fE728c`

## ⚠ Security
- Never commit `.env` files
- Book a professional audit (Spearbit / Sherlock / Code4rena) before mainnet
- Genesis Safe 2-of-3 required for all protocol changes
