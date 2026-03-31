'use strict';
/**
 * Supabase Client — Primary database for off-chain data
 * Users, trade history, leaderboard, analytics
 */
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://yrgsazztrudsugyckflz.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'sb_publishable_KRcwOIT11540Fr1fDvblYw_lHJhDLm8';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = { supabase };
