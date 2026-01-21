import {Pool} from 'pg';
import dotenv from 'dotenv'

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})


async function createTables() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users02 (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            ) `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS tasks02 (
                id SERIAL PRIMARY KEY,
                task_name VARCHAR(255) NOT NULL,
                user_id INTEGER REFERENCES users02(id) ON DELETE CASCADE
            );`);
    } catch (err) {
        console.error(err);
    }
}


async function addCount(){
    try{
        await pool.query(`ALTER TABLE users02
        ADD COLUMN task_count INTEGER DEFAULT 0 `)
    }catch(err){
        console.log(err);
    }
}


async function incTaskCount(user_id:number){
try{
    await pool.query(`UPDATE users02
        SET task_count = task_count +1 
            WHERE id=$1`,user_id)
}catch(err){
    console.log(err);
}
}

async function decTaskCount(userId: number) {
    try {
        await pool.query(`
            UPDATE users02
            SET task_count = task_count - 1
            WHERE id = $1;
        `, [userId]);
    } catch (err) {
        console.error( err);
    }
}