import { Pool } from 'pg';  
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv'
dotenv.config();
const pool = new Pool({
  connectionString : process.env.DATABASE_URL
});

async function runMigrations() {
  const client = await pool.connect();
  
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const migrationFiles = fs.readdirSync(path.join(__dirname, 'migrations'))
      .filter(file => file.endsWith('.sql'))
      .sort(); 

    const result = await client.query('SELECT filename FROM migrations');
    
    const appliedMigrations = new Set(result.rows.map(row => row.filename));

    for (const file of migrationFiles) {
      if (!appliedMigrations.has(file)) {
        console.log(`Applying migration: ${file}`);

        const sql = fs.readFileSync(path.join(__dirname, 'migrations', file), 'utf-8');
        
        await client.query(sql);

        await client.query('INSERT INTO migrations (filename) VALUES ($1)', [file]);
        console.log(`Migration ${file} applied successfully.`);
      }
    }

    console.log('All migrations applied successfully!');
  } catch (err) {
    console.error('Error applying migrations:', err);
  } finally {
    client.release();  
  }
}

async function seeMigration(){
  try{
    const result = await pool.query(`SELECT * FROM migrations`);
    console.log(result.rows);
  }catch(err){
    console.log(err);
  }
}

runMigrations();

seeMigration();