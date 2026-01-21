
import * as winston from 'winston';
import { AppConfig } from './config';

export function createLogger(config: AppConfig) {
  return winston.createLogger({
    level: config.logLevel,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json() 
    ),
    transports: [
      new winston.transports.Console()  
    ],
  });
}
