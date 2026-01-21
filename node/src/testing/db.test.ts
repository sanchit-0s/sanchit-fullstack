import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { Client } from 'pg';

let container: StartedTestContainer;
let client: Client;

beforeAll(async () => {
  container = await new GenericContainer('postgres')
    .withExposedPorts(5432) 
    .withEnv('POSTGRES_USER', 'user') 
    .withEnv('POSTGRES_PASSWORD', 'password')
    .withEnv('POSTGRES_DB', 'test_db')
    .start();

  
  const postgresHost = container.getHost();
  const postgresPort = container.getMappedPort(5432);

  client = new Client({
    host: postgresHost,
    port: postgresPort,
    user: 'user',
    password: 'password',
    database: 'test_db',
  });

  await client.connect(); 
});

beforeEach(async () => {
  await client.query('BEGIN');
});

afterAll(async () => {
  await client.end(); 
  await container.stop();
});


test('createUser should insert a new user', async () => {
  const res = await client.query(
    `INSERT INTO users (email, name) VALUES ('xyz@gmail.com', 'User') RETURNING *`
  );
  expect(res.rows[0].email).toBe('xyz@gmail.com');
  expect(res.rows[0].name).toBe('User');
});

test('getUserByEmail should return user by email', async () => {
  const res = await client.query(
    `SELECT * FROM users WHERE email = 'xyz@gmail.com'`
  );
  expect(res.rows[0].email).toBe('xyz@gmail.com');
  expect(res.rows[0].name).toBe('User');
});
