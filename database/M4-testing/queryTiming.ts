import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config()

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  async function getUsers() {
  const startTime = Date.now();  
  try {
    
    const result = await pool.query('SELECT * FROM users');
    const duration = Date.now() - startTime;  
    console.log(`Query executed in ${duration}ms`);  
    if (duration > 100) {
      console.warn(`Slow query (>100ms) executed: SELECT * FROM users`);
    }
    console.log(result.rows);
  } catch (err) {
    console.error('Error executing query', err);
  } finally {
    await pool.end();
  }
}
getUsers();