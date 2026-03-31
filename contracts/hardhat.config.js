import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const DEPLOYER_KEY = process.env.DEPLOYER_PRIVATE_KEY || "0".repeat(64);

/** @type import('hardhat/config').HardhatUserConfig */
const config = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: { enabled: true, runs: 200 },
      viaIR: true,
    },
  },
  // ADD THIS SECTION BELOW
  paths: {
    sources: "./src",
  },
  networks: {
    // ... your existing network config
  }
};

  
  networks: {
    // ── Mainnet ────────────────────────────────────────────────
    arbitrum_one: {
      url: process.env.ALCHEMY_ARBITRUM_URL || 'https://arb-mainnet.g.alchemy.com/v2/FIuzDGMai4v735SmTPvJK',
      accounts: [DEPLOYER_KEY],
      chainId: 42161,
      gasPrice: 'auto',
    },
    // ── Testnet ────────────────────────────────────────────────
    arbitrum_sepolia: {
      url: process.env.ALCHEMY_SEPOLIA_URL || 'https://arb-sepolia.g.alchemy.com/v2/FIuzDGMai4v735SmTPvJK',
      accounts: [DEPLOYER_KEY],
      chainId: 421614,
    }
  },
  etherscan: {
    apiKey: {
      // Using the key provided in your screenshot for verification
      arbitrumOne: process.env.ETHERSCAN_API_KEY || "GJAP34IXB3GUZXR744YZYPIC3WQMEHXW8Z",
      arbitrumSepolia: process.env.ETHERSCAN_API_KEY || "GJAP34IXB3GUZXR744YZYPIC3WQMEHXW8Z",
    }
  },
  sourcify: { enabled: false }
};

export default config;
