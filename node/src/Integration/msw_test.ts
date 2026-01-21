import { http , HttpRequestHandler,  } from "msw";
import { setupServer } from 'msw/node';
import fetch from 'node-fetch';  

const handlers = [
  
 http.get('http://api.test/user', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: 1, name: 'Alice' }));
  }),

  http.get('http://api.test/user', (req, res, ctx) => {
    return res(ctx.status(401));
  }),

  http.get('http://api.test/user', (req, res, ctx) => {
    return res(ctx.status(500));
  }),

  // Simulate a delayed response (timeout test)
  http.get('http://api.test/user', async (req, res, ctx) => {
    await new Promise(resolve => setTimeout(resolve, 1000));  // 1 second delay
    return res(ctx.status(200), ctx.json({ id: 1, name: 'Alice' }));
  }),
];

// 2. Set up the MSW server with the handlers
const server = setupServer(...handlers);

// 3. Start the server before running tests and clean it up after
beforeAll(() => server.listen());  // Starts MSW before tests
afterEach(() => server.resetHandlers());  // Reset handlers between tests
afterAll(() => server.close());  // Close MSW after all tests
