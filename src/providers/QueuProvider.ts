import Queue from 'bull';

class QueueProvider {
  private queue: Queue.Queue;

  constructor(queueName: string, redisUrl: string) {
    this.queue = new Queue(queueName, redisUrl);
  }

  public addJob(data: object): void {
    this.queue.add(data);
  }

  public processJobs(
    concurrency: number,
    processor: Queue.ProcessCallbackFunction<void>,
  ): void {
    this.queue.process(concurrency, processor);
  }
}

export default QueueProvider;
