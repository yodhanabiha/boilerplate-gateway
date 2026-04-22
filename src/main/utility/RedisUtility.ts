import { RedisClientType } from 'redis';
import Redis from '../config/RedisConfig';

class RedisUtility {
  public client: RedisClientType<any, any, any> | null = null;
  private prefix: string;
  private defaultTtl: number;

  constructor(RedisInstance: Redis) {
    this.prefix = ((process.env.APP_NAME || 'MyApp').replace(/\s+/g, '')) + ':';
    this.defaultTtl = process.env.REDIS_DEFAULT_TTL
      ? parseInt(process.env.REDIS_DEFAULT_TTL, 10)
      : 3600;
    this.init(RedisInstance);
  }

  private ensureConnected() {
    if (!this.client) throw new Error('Redis not connected');
  }

  private k(key: string) {
    return key.startsWith(this.prefix) ? key : this.prefix + key;
  }

  private p(pattern: string) {
    return pattern.startsWith(this.prefix) ? pattern : this.prefix + pattern;
  }

  async init(RedisInstance: Redis) {
    this.client = await RedisInstance.authenticate();
  }

  async SetEx(data: { key: string; value: string; ttl?: number }) {
    this.ensureConnected();
    const ttl = data.ttl ?? this.defaultTtl;
    await this.client!.setEx(this.k(data.key), ttl, data.value);
    return true;
  }

  async SetExpiredAt(data: { key: string; value: string; expiredAt?: number }) {
    this.ensureConnected();
    const key = this.k(data.key);

    const ts =
      data.expiredAt ??
      Math.floor(Date.now() / 1000) + this.defaultTtl;

    await this.client!.set(key, data.value);
    await this.client!.expireAt(key, ts);
    return true;
  }

  async Set(data: { key: string; value: string; ttl?: number }) {
    this.ensureConnected();
    const key = this.k(data.key);
    const ttl = data.ttl ?? this.defaultTtl;

    await this.client!.set(key, data.value, { EX: ttl });
    return true;
  }

  async Get(key: string) {
    this.ensureConnected();
    return this.client!.get(this.k(key));
  }

  async Delete(key: string) {
    this.ensureConnected();
    return this.client!.del(this.k(key));
  }


  async GetKeysFromPattern(pattern: string) {
    this.ensureConnected();
    const match = this.p(pattern);
    const keys: string[] = [];
    for await (const key of this.client!.scanIterator({ MATCH: match, COUNT: 100 })) {
      keys.push(key);
    }
    return keys;
  }

  async DeleteKeysFromPattern(pattern: string) {
    this.ensureConnected();
    const match = this.p(pattern);
    let count = 0;
    for await (const key of this.client!.scanIterator({ MATCH: match, COUNT: 100 })) {
      count += await this.client!.del(key);
    }
    return count;
  }
}

export default new RedisUtility(new Redis());
