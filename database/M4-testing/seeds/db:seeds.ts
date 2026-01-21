import { Client } from 'pg'; 
import { minimalSeed } from '../seeds/minimal_seed';
import { realisticSeed } from '../seeds/realistic_seed';
import dotenv from 'dotenv';
dotenv.config();


const seed = realisticSeed;

const dbClient = new Client({
  connectionString: process.env.DATABASE_URL 
});


async function creatTables(){
    try{
        await dbClient.query(` CREATE TABLE IF NOT EXISTS seedUsers (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL)`);

            await dbClient.query(` CREATE TABLE IF NOT EXISTS seedProducts (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                price DECIMAL(10, 2))`)
    }catch(err){
        console.log(err);
    }
}

async function seedData(seedData: any) {
  for (const { table, data } of seedData) {
    for (const row of data) {
      const columns = Object.keys(row).join(', ');
      const values = Object.values(row).map(val => `'${val}'`).join(', ');
      const query = `INSERT INTO ${table} (${columns}) VALUES (${values})`;

      try {
        await dbClient.query(query); 
      } catch (err) {
        console.error(`Error inserting into ${table}:`, err);
      }
    }
  }
}

async function run() {
    try {
      await dbClient.connect();
        await creatTables();
      await seedData(seed); 
      console.log(`${seed === minimalSeed ? 'Minimal' : 'Realistic'} data seeded successfully`); 
    } catch (err) {
      console.error('Error seeding database:', err); 
    } finally {
      await dbClient.end(); 
    }
  }
  
  run();
  async function showData(){
    try{
       const result1=  await dbClient.query(`SELECT * FROM seedProducts`);
       const result2=  await dbClient.query(`SELECT * FROM seedUsers`);
       console.log(result1);
       console.log(result2);

    }catch(err){
        console.log(err)
    }
  }
  showData();