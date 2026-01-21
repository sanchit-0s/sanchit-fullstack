import {Pool} from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function connection(){
    try{
        const result = await pool.query('SELECT NOW()');
        console.log(result.rows[0]);
    }catch(err){
        console.log(err);
    }finally{
        pool.end();
    }
}
connection();