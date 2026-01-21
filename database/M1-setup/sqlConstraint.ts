import {Pool} from 'pg'
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

async function creatingTask(){
    try{
        await pool.query(`CREATE TABLE IF NOT EXISTS users2(
            id SERIAL PRIMARY KEY,
            email TEXT UNIQUE   
        )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS tasks2 (
    id SERIAL,
    title TEXT  NOT NULL ,
    completed BOOLEAN DEFAULT FALSE ,
    user_id INTEGER REFRENCES users2(id),
    CHECK (LENGTH(title)>0)
)`)

    }catch(err){console.log(err)}
}

async function insert(){
    try{
        await pool.query(`INSERT INTO task2 (title) VALUES ('')`)
    }catch(err){
        console.log("problem in inserting value");
    }
}

creatingTask();
insert();