import express, { Express, Request, Response } from 'express';
import { Server } from 'http';
import { AppConfig } from './config';
import { createLogger } from './logger';

export class TaskServer {
  private app: Express;
  private server?: Server;
  private logger = createLogger(this.config);

  constructor(private config: AppConfig) {
    this.app = express();
    this.setupApp();
  }

  private setupApp(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.get('/health', (req: Request, res: Response) => {
      res.status(200).send('Server is healthy');
    });

    this.app.use((req, res, next) => {
      this.logger.info(`${req.method} ${req.originalUrl}`);
      next();
    });

  }

  async start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server = this.app.listen(this.config.port, () => {
        this.logger.info(`Server running on port ${this.config.port} in ${this.config.env} mode`);
        resolve();
      });

      this.server.on('error', (err) => {
        this.logger.error(`Error starting server: ${err.message}`);
        reject(err);
      });
    });
  }

  async stop(): Promise<void> {
    if (!this.server) {
      this.logger.warn('Server is not running');
      return;
    }

    return new Promise((resolve) => {
      (() => {
        this.logger.info('Server closed gracefully');
        resolve();
      });

      setTimeout(() => {
        this.logger.error('Force shutdown');
        process.exit(1);
      }, 10000);
    });
  }
}
