declare class LoggerProvider {
    private logger;
    logInfo(message: string, data?: any): void;
    logError(message: string, error?: any): void;
    logDebug(message: string, data?: any): void;
}
export default LoggerProvider;
