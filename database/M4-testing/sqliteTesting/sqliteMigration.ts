import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const db = new Database(':memory:'); 

async function runMigrations() {
  const migrationsDir = path.join(__dirname, '../../M3-integration/migrations'); 

  const migrationFiles = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))  
    .sort(); 

  try {
    for (const file of migrationFiles) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');
      
      console.log(`Applying migration: ${file}`);
      await applyMigration(sql); //
      console.log(`Migration ${file} applied successfully.`);
    }
    console.log('All migrations applied successfully!');
  } catch (err) {
    console.error('Error applying migrations:', err);
  } finally {
    db.close(); 
  }
}

function applyMigration(sql: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      db.exec(sql); 
      resolve();
    } catch (err) {
      reject(err); 
    }
  });
}
function printDatabaseContents() {
  try {
   
    const tables = db.prepare(`SELECT name FROM sqlite_master WHERE type='table'`).all();

    tables.forEach((table) => {
      console.log(` ${table.name}`);
      const rows = db.prepare(`SELECT * FROM ${table.name}`).all();
      console.log(rows);  
    });
  } catch (err) {
    console.error('Error reading database contents:', err);
  }
}

runMigrations();
printDatabaseContents();