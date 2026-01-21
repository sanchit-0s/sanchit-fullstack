import { rest  } from 'msw';

import { setupServer } from 'msw/node';  


export const handlers = [
 
 rest.get('https://tesing.com/user', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ id: 1, name: 'xyz', email: 'xyz@testing.com' })
    );
  }),

  
 rest.get('https://tesing.com/user', (req, res, ctx) => {
    return res(
      ctx.status(401),
      ctx.json({ message: 'Unauthorized' })
    );
  }),

  
 rest.get('https://tesing.com/user', (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'Internal Server Error' })
    );
  }),

  
 rest.get('https://tesing.com/user', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(5000), 
      ctx.json({ id: 1, name: 'xyz', email: 'xyz@testing.com' })
    );
  }),
];

export const server = setupServer(...handlers);
