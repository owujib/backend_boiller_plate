export interface IDatabaseProvider {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getRepository<T>(entity: new () => T): any;
  // Add other common methods as needed
}
