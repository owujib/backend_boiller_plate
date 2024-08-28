"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bull_1 = __importDefault(require("bull"));
class QueueProvider {
    constructor(queueName, redisUrl) {
        this.queue = new bull_1.default(queueName, redisUrl);
    }
    addJob(data) {
        this.queue.add(data);
    }
    processJobs(concurrency, processor) {
        this.queue.process(concurrency, processor);
    }
}
exports.default = QueueProvider;
