import {Pool} from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const pool = new Pool({
    connectionString : process.env.DATABASE_URL,
});

export async function createTable(){
    try{
        await pool.query(
            `CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                email TEXT UNIQUE,
                created_at TIMESTAMPTZ DEFAULT NOW()
            );`
        );
        
        await pool.query(
            ` CREATE TABLE IF NOT EXISTS tasks(
                id SERIAL,
                title TEXT NOT NULL,
                completed BOOLEAN DEFAULT FALSE
                
            );`
        );
                console.log("tables are created")
    }catch(err){
        console.log(err)
    }
}


export async function insertTables(){
    try{
await pool.query(
    `INSERT INTO users (email) VALUES
    ('abc@gmail.com'),
    ('xyz@gmail.com')
    `
)

await pool.query(
    `INSERT INTO tasks (title,completed) VALUES
    ('got to movies',FALSE),
    ('eat lunch',TRUE)`
)
    console.log("data is inserted")

    }catch(err){
        console.error(err);
    }
}

async function fetchTablesData(){
    try{
       const users =  await pool.query(`SELECT * FROM users`);
       console.log(users.rows);
       const tasks =  await pool.query(`SELECT * FROM tasks`);
       console.log(tasks.rows);

    }catch(err){
        console.log(err)
    }
}


async function collection(){
    await createTable();
    await insertTables();
    await fetchTablesData();
    pool.end();
}

collection().catch((err)=> console.log(err));