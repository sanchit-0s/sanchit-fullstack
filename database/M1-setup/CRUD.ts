import {Pool} from 'pg';
import dotenv from 'dotenv';
import { createTable } from './dbBasic';

dotenv.config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

async function create(title:string){
    try{
        await pool.query(`INSERT INTO tasks (title) VALUES ($1)`,[title]);
        console.log(`task ${title} created`);

    }catch(err){
        console.log(err);
    }
}

async function read(completed:boolean){
    try{
       const result = await pool.query(`SELECT * FROM tasks WHERE completed=$1`,[completed]);
        console.log(result.rows);

    }catch(err){
        console.log(err);
    }
}

async function update(id:number){
    try{
     await pool.query(`UPDATE tasks SET completed = true WHERE id=$1`, [id]);
    
    }catch(err){
        console.log(err);
    }
}
 async function deleteTask() {
    await pool.query(`DELETE FROM tasks WHERE completed= false`);
  }
  

async function allFunctions(){
    await createTable();
    await create("going to the gym");
    await read(false);
    await update(1);
    await deleteTask();
    pool.end();
}

allFunctions().catch((err)=> console.log(err));