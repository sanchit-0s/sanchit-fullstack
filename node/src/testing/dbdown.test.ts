import { Client } from 'pg';
import request from 'supertest';
import { app } from '../testing/app2';
import { server } from '../testing/mswHandler'; 
import { rest } from 'msw'; 

let client: Client;

beforeAll(async () => {
  client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'user',
    password: 'password',
    database: 'test_db',
  });
  await client.connect();
});

afterAll(async () => {
  await client.end();
});

describe('Error Handling and Edge Cases', () => {
  test('should return 503 when DB is down', async () => {
    await client.end(); 

    const response = await request(app).get('/users');
    expect(response.status).toBe(503);
    expect(response.body.message).toBe('Service Unavailable');
  });

  
  beforeAll(() => {
    server.use(
      rest.get('https://api.example.com/user', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.body('{ id: 1, name: "John", email: "john@example.com" ') 
        );
      })
    );
  });

  test('should return parse error when receiving invalid JSON from external service', async () => {
    const response = await request(app).get('/users/external');
    expect(response.status).toBe(500);
    expect(response.body.message).toContain('Invalid JSON response from external service');
  });

  test('should rollback transaction if an error occurs', async () => {
    const response = await request(app).post('/users').send({
      email: 'duplicate@example.com',
      name: 'Duplicate User',
    });

    expect(response.status).toBe(400);

    const res = await client.query('SELECT COUNT(*) FROM users WHERE email = $1', ['duplicate@example.com']);
    expect(res.rows[0].count).toBe('0');
  });

  test('should return error response in RFC 7807 format', async () => {
    const response = await request(app).get('/nonexistent-route');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('type');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('detail');
    expect(response.body).toHaveProperty('instance');
  });

  
});
