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

afterEach(async () => {
  await client.query('ROLLBACK');
});

afterAll(async () => {
  await client.end();
  await container.stop();
});
