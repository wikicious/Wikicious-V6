'use strict';
/**
 * Upstash Redis — Rate limiting, price caching, session storage
 * Uses REST API (works without native Redis client)
 */
const axios = require('axios');

const REDIS_URL   = process.env.UPSTASH_REDIS_REST_URL   || 'https://peaceful-mullet-88439.upstash.io';
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN  || '';

async function redisCmd(cmd, ...args) {
  try {
    const resp = await axios.post(
      `${REDIS_URL}/${[cmd, ...args].join('/')}`,
      null,
      { headers: { Authorization: `Bearer ${REDIS_TOKEN}` }, timeout: 3000 }
    );
    return resp.data.result;
  } catch (e) {
    console.error('[Redis]', e.message?.slice(0, 60));
    return null;
  }
}

const redis = {
  get:    (key)           => redisCmd('get', key),
  set:    (key, val, ex)  => ex ? redisCmd('setex', key, ex, val) : redisCmd('set', key, val),
  del:    (key)           => redisCmd('del', key),
  incr:   (key)           => redisCmd('incr', key),
  expire: (key, sec)      => redisCmd('expire', key, sec),
  ttl:    (key)           => redisCmd('ttl', key),
  hset:   (key, ...args)  => redisCmd('hset', key, ...args),
  hget:   (key, field)    => redisCmd('hget', key, field),
  hgetall:(key)           => redisCmd('hgetall', key),
};

module.exports = { redis };
