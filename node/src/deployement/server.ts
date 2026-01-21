import http from 'http';

const PORT = 8000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, world!');
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const shutdown = () => {
    console.log('Shutting down');
    server.close(() => {
      console.log('Server has shut down cleanly.');
      process.exit(0);  
    });
  
    
    setTimeout(() => {
      console.error('Forcefully exiting due to timeout...');
      process.exit(1);
    }, 10000);
  };
  
  process.on('SIGINT', shutdown);  
  process.on('SIGTERM', shutdown); 