declare class CacheProvider {
    private client;
    constructor();
    set(key: string, value: string): void;
    get(key: string, callback: (err: Error | null, reply: string) => void): void;
    delete(key: string): void;
}
export default CacheProvider;
