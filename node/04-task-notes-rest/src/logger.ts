import winston from 'winston';
import { v4 as uuidv4 } from 'uuid';

const { combine, timestamp, printf } = winston.format;

const logFormat = printf(({ level, message, timestamp, requestId }) => {
  return `${timestamp} [${requestId}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    winston.format.splat(),
    logFormat
  ),
  transports: [
    new winston.transports.Console()
  ]
});

export const logMiddleware = (req, res, next) => {
  const requestId = uuidv4();
  req.requestId = requestId;
  res.setHeader('X-Request-ID', requestId);  
  next();
};

export default logger;
