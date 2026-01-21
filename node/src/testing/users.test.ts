import request from 'supertest';
import { app } from '../testing/app2'; 
import { Client } from 'pg';

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

beforeEach(async () => {
  await client.query(
    `INSERT INTO users (email, name) VALUES ('test@example.com', 'Test User')`
  );
  await client.query('BEGIN');
});

afterEach(async () => {
  await client.query('ROLLBACK');
});

test('createUser should insert a new user', async () => {
  const res = await request(app)
    .post('/users')
    .send({ email: 'newuser@example.com', name: 'New User' })
    .expect(201);

  expect(res.body.email).toBe('newuser@example.com');
  expect(res.body.name).toBe('New User');
});

test('getUserById should return user by ID', async () => {
  const res = await request(app)
    .get('/users/1') 
    .expect(200);

  expect(res.body.email).toBe('test@example.com');
  expect(res.body.name).toBe('Test User');
});

test('getUserById should return 404 if user does not exist', async () => {
  const res = await request(app)
    .get('/users/999') 
    .expect(404);

  expect(res.body.message).toBe('User not found');
});

test('pagination should return the expected slice of users', async () => {
  
  await client.query(
    `INSERT INTO users (email, name) VALUES ('user1@example.com', 'User One')`
  );
  await client.query(
    `INSERT INTO users (email, name) VALUES ('user2@example.com', 'User Two')`
  );
  await client.query(
    `INSERT INTO users (email, name) VALUES ('user3@example.com', 'User Three')`
  );

  const res = await request(app)
    .get('/users?page=1&limit=2')
    .expect(200);

  expect(res.body.length).toBe(2); 
  expect(res.body[0].name).toBe('Test User');
  expect(res.body[1].name).toBe('User One');
});
