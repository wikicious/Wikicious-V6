'use strict';
/**
 * Tenderly — Transaction Simulation Service
 * Simulates every write call before executing on-chain.
 * Prevents failed transactions and wasted gas.
 */
const axios = require('axios');

const TENDERLY_API   = process.env.TENDERLY_API   || 'https://api.tenderly.co/api/v1/account/Hetwik/project/wikicious/';
const TENDERLY_KEY   = process.env.TENDERLY_SECRET || 'b-bLF9vCbPlwp0WNNcoWn2LF1tHFbTZO';
const TENDERLY_RPC   = process.env.TENDERLY_RPC_URL || 'https://arbitrum.gateway.tenderly.co/OpKre4Fn8UPOCdlWMyhEZ';

const tenderlyClient = axios.create({
  baseURL: TENDERLY_API,
  headers: { 'X-Access-Key': TENDERLY_KEY, 'Content-Type': 'application/json' },
});

/**
 * Simulate a transaction before sending it on-chain.
 * @param {object} tx  - { from, to, data, value }
 * @returns {{ success, gasUsed, error, logs }}
 */
async function simulate(tx) {
  try {
    const resp = await tenderlyClient.post('simulations', {
      network_id:   '42161',   // Arbitrum One
      from:         tx.from,
      to:           tx.to,
      input:        tx.data  || '0x',
      value:        tx.value || '0',
      save:         true,
      save_if_fails: true,
    });

    const sim = resp.data.simulation;
    return {
      success:   sim.status,
      gasUsed:   sim.gas_used,
      gasPrice:  sim.gas_price,
      simUrl:    `https://dashboard.tenderly.co/Hetwik/wikicious/simulator/${sim.id}`,
      error:     sim.error_message || null,
      logs:      sim.transaction?.transaction_info?.logs || [],
    };
  } catch (e) {
    return {
      success: false,
      error:   e.response?.data?.error?.message || e.message,
      gasUsed: 0,
      logs:    [],
    };
  }
}

/**
 * Share a simulation link for the admin panel.
 */
async function getSimulationLink(txHash) {
  return `https://dashboard.tenderly.co/Hetwik/wikicious/tx/arbitrum/${txHash}`;
}

module.exports = { simulate, getSimulationLink, TENDERLY_RPC };
