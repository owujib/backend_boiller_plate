import redis from 'redis';

class CacheProvider {
  private client: redis.RedisClient;

  constructor() {
    this.client = redis.createClient();
  }

  public set(key: string, value: string): void {
    this.client.set(key, value);
  }

  public get(
    key: string,
    callback: (err: Error | null, reply: string) => void,
  ): void {
    this.client.get(key, callback);
  }

  public delete(key: string): void {
    this.client.del(key);
  }
}

export default CacheProvider;
