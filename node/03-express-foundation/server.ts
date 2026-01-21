import express, { Request, Response, NextFunction } from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;
const serverStartTime = Date.now();

app.use((req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  const formattedDate = new Date().toISOString();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(`[${formattedDate}] ${req.method} ${req.originalUrl} - ${duration}ms`);
  });
  
  next();
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

app.get('/api/info', (req: Request, res: Response) => {
  const uptime = process.uptime();
  res.status(200).json({
    version: '1.0.0',
    uptime: `${uptime.toFixed(2)} seconds`,
    startTime: new Date(serverStartTime).toISOString(),
    status: 'Running'
  });
});

app.post('/api/echo', express.json(), (req: Request, res: Response) => {
  res.status(200).json(req.body);
});

app.use(express.static(path.join(__dirname, '../public')));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

process.on('SIGINT', () => {
  console.log('\nShutting down gracefully...');
  app.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
