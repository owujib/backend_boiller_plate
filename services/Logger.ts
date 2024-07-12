import pino from 'pino';

class Logger {
  private logger;

  constructor() {
    this.logger = pino({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true, // Colorize the output for better readability
          translateTime: 'SYS:standard', // Translate timestamp to local time
          ignore: 'pid,hostname', // Ignore these fields
        },
      },
      level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    });
  }

  info(message: string, ...args: any[]) {
    this.logger.info(message, ...args);
  }

  warn(message: string, ...args: any[]) {
    this.logger.warn(message, ...args);
  }

  error(message: string, ...args: any[]) {
    this.logger.error(message, ...args);
  }

  debug(message: string, ...args: any[]) {
    this.logger.debug(message, ...args);
  }

  verbose(message: string, ...args: any[]) {
    this.logger.trace(message, ...args);
  }
}

export default new Logger();
