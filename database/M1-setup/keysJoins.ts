import {Pool} from 'pg';
import dotenv from 'dotenv';
import { createTable ,insertTables} from './dbBasic';
dotenv.config();


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

async function alterTable(){
   try{ await pool.query(`
    ALTER TABLE tasks
    ADD COLUMN user_id INTEGER REFERENCES users(id) ON DELETE SET NULL`)

    console.log("user_id column added")

}catch(err){
    console.log(err);
}
}

async function insertTask(){
    try{
        await pool.query(`
        INSERT INTO tasks (title,user_id) VALUES
        ('completing assignment',1),
        ('learning databse',2)`)
        console.log("task created");
    }catch(err){
        console.log(err);
    }
}

async function getAllTasks(user_id:number){
    try{
        const task = await pool.query(`SELECT * FROM tasks WHERE user_id=$1`,[user_id]);
        console.log(task.rows);

    }catch(err){console.log(err)};
}

async function getTasksWithUserEmail() {
    try {
        const result = await pool.query(`
            SELECT t.title, u.email
            FROM tasks t
            LEFT JOIN users u ON t.user_id = u.id;
        `);

        console.log(result.rows);
    } catch (err) {
        console.log( err);
    }
}

async function allFunction(){
    await createTable();
    await insertTables();
    await alterTable();
    await insertTask();
    await getAllTasks(1);
    await getTasksWithUserEmail();
    pool.end();
}

allFunction().catch((err)=>console.log(err));