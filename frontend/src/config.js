/**
 * Wikicious V6 — App Configuration
 * All values from environment variables — see .env
 */
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum, arbitrumSepolia } from 'wagmi/chains';
import { http } from 'wagmi';

// ── API Endpoints ─────────────────────────────────────────────────
export const API_URL = process.env.REACT_APP_API_URL   || 'https://api.wikicious.io';
export const WS_URL  = process.env.REACT_APP_WS_URL    || 'wss://api.wikicious.io/ws';

// ── Open Exchange Rates ──────────────────────────────────────────
export const OPEN_EXCHANGE_APP_ID = process.env.REACT_APP_OPEN_EXCHANGE_APP_ID || '6953c00e8dda4055aa0c171c0e7f6262';
export const OPEN_EXCHANGE_URL    = `https://openexchangerates.org/api/latest.json?app_id=${OPEN_EXCHANGE_APP_ID}`;

// ── WalletConnect / Reown ─────────────────────────────────────────
const WC_PROJECT_ID = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID || '3d9cd15ae58cbe78f6b5f44b2ac160cd';

export const wagmiConfig = getDefaultConfig({
  appName:    'Wikicious V6',
  projectId:  WC_PROJECT_ID,
  chains:     [arbitrum, arbitrumSepolia],
  transports: {
    [arbitrum.id]:        http(`https://arb-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY || 'FIuzDGMai4v735SmTPvJK'}`),
    [arbitrumSepolia.id]: http(`https://arb-sepolia.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY || 'FIuzDGMai4v735SmTPvJK'}`),
  },
});

// ── Contract Addresses ────────────────────────────────────────────
// Fill these from contracts/deployments.arbitrum.json after deploy
export const CONTRACTS = {
  USDC:                 '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  WETH:                 '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  WBTC:                 '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
  ARB:                  '0x912CE59144191C1204E64559FE8253a0e49E6548',
  WIKToken:             process.env.REACT_APP_WIK_TOKEN             || '',
  WikiVault:            process.env.REACT_APP_WIKI_VAULT            || '',
  WikiOracle:           process.env.REACT_APP_WIKI_ORACLE           || '',
  WikiPerp:             process.env.REACT_APP_WIKI_PERP             || '',
  WikiSpot:             process.env.REACT_APP_WIKI_SPOT             || '',
  WikiStaking:          process.env.REACT_APP_WIKI_STAKING          || '',
  WikiLending:          process.env.REACT_APP_WIKI_LENDING          || '',
  WikiBridge:           process.env.REACT_APP_WIKI_BRIDGE           || '',
  WikiPropPool:         process.env.REACT_APP_WIKI_PROP_POOL        || '',
  WikiPropEval:         process.env.REACT_APP_WIKI_PROP_EVAL        || '',
  WikiPropFunded:       process.env.REACT_APP_WIKI_PROP_FUNDED      || '',
  WikiPropChallenge:    process.env.REACT_APP_WIKI_PROP_CHALLENGE   || '',
  WikiRevenueSplitter:  process.env.REACT_APP_REVENUE_SPLITTER      || '',
  WikiMarketRegistry:   process.env.REACT_APP_MARKET_REGISTRY       || '',
  WikiUserBotFactory:   process.env.REACT_APP_USER_BOT_FACTORY      || '',
  WikiIdleYieldRouter:  process.env.REACT_APP_IDLE_YIELD_ROUTER     || '',
  WikiPropPoolYield:    process.env.REACT_APP_PROP_POOL_YIELD       || '',
};

// ── Fiat On-Ramp Keys ─────────────────────────────────────────────
export const FIAT = {
  MOONPAY_KEY:   process.env.REACT_APP_MOONPAY_API_KEY  || 'pk_test_your_key',
  TRANSAK_KEY:   process.env.REACT_APP_TRANSAK_API_KEY  || 'staging_test_key',
  BANXA_ID:      process.env.REACT_APP_BANXA_PARTNER_ID || 'wikicious',
  RAMP_KEY:      process.env.REACT_APP_RAMP_API_KEY     || 'your_ramp_key',
};
