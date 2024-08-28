import Queue from 'bull';
declare class QueueProvider {
    private queue;
    constructor(queueName: string, redisUrl: string);
    addJob(data: object): void;
    processJobs(concurrency: number, processor: Queue.ProcessCallbackFunction<void>): void;
}
export default QueueProvider;
