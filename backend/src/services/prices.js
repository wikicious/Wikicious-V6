'use strict';
const axios = require('axios');

const OER_APP_ID  = process.env.OPEN_EXCHANGE_APP_ID || '6953c00e8dda4055aa0c171c0e7f6262';
const OER_URL     = `https://openexchangerates.org/api/latest.json?app_id=${OER_APP_ID}`;

let fiatRatesCache = null;
let fiatRatesTs    = 0;
const FIAT_TTL     = 60 * 60 * 1000; // 1 hour

/** Get live fiat exchange rates (USD base) via Open Exchange Rates */
async function getFiatRates() {
  if (fiatRatesCache && Date.now() - fiatRatesTs < FIAT_TTL) {
    return fiatRatesCache;
  }
  try {
    const resp = await axios.get(OER_URL, { timeout: 5000 });
    fiatRatesCache = resp.data.rates;
    fiatRatesTs    = Date.now();
    return fiatRatesCache;
  } catch (e) {
    console.error('[Prices] OER error:', e.message?.slice(0, 60));
    return fiatRatesCache || {};
  }
}

/** Convert USD amount to target fiat currency */
async function usdToFiat(usdAmount, targetCurrency = 'USD') {
  if (targetCurrency === 'USD') return usdAmount;
  const rates = await getFiatRates();
  const rate  = rates[targetCurrency] || 1;
  return usdAmount * rate;
}

module.exports = { getFiatRates, usdToFiat };
