// foundations drill7

import http, { IncomingMessage, ServerResponse } from 'http';

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, world!\n');
});

// server.listen(3000, () => {
//     console.log('Server is running at http://localhost:3000');
// });

process.on('SIGINT', () => {
    console.log('SIGINT received ');
    server.close(() => {
        console.log('Server is closed.');
        process.exit(0); 
    });
});

process.on('SIGTERM', () => {
    console.log('SIGTERM received.');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0); 
    });
});
