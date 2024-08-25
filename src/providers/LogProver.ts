import pino from 'pino';

class LoggerProvider {
  private logger = pino();

  public logInfo(message: string, data?: any): void {
    this.logger.info({ message, ...data });
  }

  public logError(message: string, error?: any): void {
    this.logger.error({ message, ...error });
  }

  public logDebug(message: string, data?: any): void {
    this.logger.debug({ message, ...data });
  }
}

export default LoggerProvider;
