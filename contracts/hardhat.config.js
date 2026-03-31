require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

const DEPLOYER_KEY = process.env.DEPLOYER_PRIVATE_KEY || '0'.repeat(64);

module.exports = {
  solidity: {
    version: '0.8.24',
    settings: {
      optimizer: { enabled: true, runs: 200 },
      viaIR: true,
    },
  },
  networks: {
    // ── Mainnet ────────────────────────────────────────────────
    arbitrum_one: {
      url:      process.env.ALCHEMY_ARBITRUM_URL || 'https://arb-mainnet.g.alchemy.com/v2/FIuzDGMai4v735SmTPvJK',
      accounts: [DEPLOYER_KEY],
      chainId:  42161,
      gasPrice: 'auto',
    },
    // ── Testnet ────────────────────────────────────────────────
    arbitrum_sepolia: {
      url:      process.env.ALCHEMY_SEPOLIA_URL  || 'https://arb-sepolia.g.alchemy.com/v2/FIuzDGMai4v735SmTPvJK',
      accounts: [DEPLOYER_KEY],
      chainId:  421614,
    },
    // ── Tenderly Simulation (use for testing before mainnet) ───
    tenderly: {
      url:      process.env.TENDERLY_RPC_URL || 'https://arbitrum.gateway.tenderly.co/OpKre4Fn8UPOCdlWMyhEZ',
      accounts: [DEPLOYER_KEY],
      chainId:  42161,
    },
  },
  // ── Etherscan (Arbiscan merged into Etherscan) ────────────────
  etherscan: {
    apiKey: {
      arbitrumOne:     process.env.ETHERSCAN_API_KEY || 'GJAP34IXB3GUZXR744YZYPIC3WQWEHXW8Z',
      arbitrumSepolia: process.env.ETHERSCAN_API_KEY || 'GJAP34IXB3GUZXR744YZYPIC3WQWEHXW8Z',
    },
    customChains: [{
      network: 'arbitrumSepolia',
      chainId:  421614,
      urls: {
        apiURL:     'https://api-sepolia.arbiscan.io/api',
        browserURL: 'https://sepolia.arbiscan.io',
      },
    }],
  },
  sourcify: { enabled: false },
};
