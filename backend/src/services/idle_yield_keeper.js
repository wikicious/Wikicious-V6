'use strict';
/**
 * WikiIdleYieldRouter Keeper
 * Runs every 6h — finds idle capital across all 15 sources and deploys it
 * Runs every 24h — harvests accumulated yield → RevenueSplitter
 */
const { ethers } = require('ethers');
const { getProvider } = require('./chain');

const ROUTER_ABI = [
  'function harvestAll() external',
  'function totalDeployed() view returns (uint256)',
  'function estimatedBlendedAPY() view returns (uint256)',
  'function totalYieldGenerated() view returns (uint256)',
  'function getAllSources() view returns (address[], string[], uint256[])',
];

const SOURCE_ABI = [
  'function deployIdle(uint256 amount) external',
  'function recallIdle(uint256 amount, string reason) external',
];

const USDC_ABI = ['function balanceOf(address) view returns (uint256)'];

class IdleYieldKeeper {
  constructor(keeperKey) {
    const provider = getProvider();
    this.wallet = new ethers.Wallet(keeperKey, provider);
    this.router = null;
  }

  init(routerAddr) {
    this.routerAddr = routerAddr;
    this.router = new ethers.Contract(routerAddr, ROUTER_ABI, this.wallet);
    console.log('[IdleYieldKeeper] Initialized, router:', routerAddr);
  }

  // Every 6h: check each source for idle USDC and deploy
  async deployAllIdle(sourceAddresses) {
    const usdc = new ethers.Contract(
      process.env.USDC_ADDRESS || '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      USDC_ABI, this.wallet
    );
    
    let totalDeployed = 0n;
    for (const addr of sourceAddresses) {
      try {
        const bal = await usdc.balanceOf(addr);
        const minDeploy = ethers.parseUnits('500', 6); // $500 min
        if (bal < minDeploy) continue;
        
        // Deploy 80% of idle balance
        const toDeploy = bal * 8000n / 10000n;
        const src = new ethers.Contract(addr, SOURCE_ABI, this.wallet);
        const tx = await src.deployIdle(toDeploy);
        await tx.wait();
        totalDeployed += toDeploy;
        console.log(`[IdleYieldKeeper] Deployed $${ethers.formatUnits(toDeploy, 6)} from ${addr.slice(0,10)}`);
      } catch (e) {
        console.error(`[IdleYieldKeeper] Error deploying from ${addr.slice(0,10)}:`, e.message?.slice(0,60));
      }
    }
    console.log(`[IdleYieldKeeper] Total deployed: $${ethers.formatUnits(totalDeployed, 6)}`);
  }

  // Every 24h: harvest yield
  async harvest() {
    try {
      const tx = await this.router.harvestAll();
      await tx.wait();
      console.log('[IdleYieldKeeper] Yield harvested → RevenueSplitter');
    } catch (e) {
      console.error('[IdleYieldKeeper] Harvest error:', e.message?.slice(0,80));
    }
  }

  async getStats() {
    try {
      const [td, apy, yg, [addrs, names, deployed]] = await Promise.all([
        this.router.totalDeployed(),
        this.router.estimatedBlendedAPY(),
        this.router.totalYieldGenerated(),
        this.router.getAllSources(),
      ]);
      return {
        totalDeployed:        Number(td),
        estimatedBlendedAPY:  Number(apy),
        totalYieldGenerated:  Number(yg),
        sources: addrs.map((a, i) => ({
          address: a, name: names[i], deployed: Number(deployed[i])
        })),
      };
    } catch { return { totalDeployed:0, estimatedBlendedAPY:0, totalYieldGenerated:0, sources:[] }; }
  }
}

module.exports = IdleYieldKeeper;
