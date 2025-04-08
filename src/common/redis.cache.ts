import { createClient, RedisClientType } from 'redis';
import config from '../config';

const { redisEX } = config;

// class RedisCache {
let client!: RedisClientType;

const connect = async () => {
  if (!client) {
    client = createClient({
      url: config.redisURL,
      password:config.redisPassword,
    });

    client.on('connect', () => {
      console.log('🚀 Connected to Redis');
    });

    client.on('error', (err: Error) => {
      console.error('Redis error:', err);
    });

    // Connect the client to the Redis server
    client.connect().catch(console.error);

    client.on('reconnecting', () => {
      console.log('Reconnecting to Redis');
    });
  }
};

const delToRedis = async (id: string) => {
  try {
    await client.del(id);
  } catch (error) {
    console.log(error);

    return false;
  }
};

const setToRedis = async (id: string, data: any) => {
  try {
    await client.set(id, JSON.stringify(data), {
      EX: redisEX, // Expiry time in seconds
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getToRedis = async (id: string) => {
  try {
    let getData = await client.get(id);
    if (getData == null) {
      return false;
    }
    return getData;
  } catch (error) {
    return false;
  }
};

export default { setToRedis, getToRedis, delToRedis, connect };
