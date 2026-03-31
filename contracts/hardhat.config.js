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
  networks: {
    arbitrum_one: {
      url: process.env.ALCHEMY_ARBITRUM_URL || "https://arb-mainnet.g.alchemy.com/v2/FiuZDGMNai4v73...",
      accounts: [DEPLOYER_KEY],
      chainId: 42161,
    },
    arbitrum_sepolia: {
      url: process.env.ALCHEMY_SEPOLIA_URL || "https://arb-sepolia.g.alchemy.com/v2/FiuZDGMNai4v73...",
      accounts: [DEPLOYER_KEY],
      chainId: 421614,
    }
  },
  etherscan: {
    apiKey: {
      arbitrumOne: process.env.ETHERSCAN_API_KEY || "GJAP34...",
      arbitrumSepolia: process.env.ETHERSCAN_API_KEY || "GJAP34...",
    }
  },
  sourcify: { enabled: false }
};

export default config;
