"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
class CacheProvider {
    constructor() {
        this.client = redis_1.default.createClient();
    }
    set(key, value) {
        this.client.set(key, value);
    }
    get(key, callback) {
        this.client.get(key, callback);
    }
    delete(key) {
        this.client.del(key);
    }
}
exports.default = CacheProvider;
