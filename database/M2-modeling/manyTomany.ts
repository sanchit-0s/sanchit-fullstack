import {Pool} from 'pg';
import dotenv from 'dotenv'

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})


async function createTags(){
    try{
        await pool.query(`
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            title TEXT UNIQUE
        )`)
        await pool.query(`
        CREATE TABLE IF NOT EXISTS tags (
            id SERIAL PRIMARY KEY,
            name TEXT UNIQUE
        )`)

    }catch(err){
        console.log(err);
    }
}

async function createTaskTags(){
    try{
        await pool.query(`
        CREATE TABLE IF NOT EXISTS task_tags (
            task_id INTEGER REFERENCES tasks(id),
            tag_id INTEGER REFERENCES tags(id),
            PRIMARY KEY (task_id,tag_id)
        )`)
    }catch(err){console.log(err)}
}
async function insertTask(){
    try{
        await pool.query(`INSERT INTO tasks (title) VALUES
                ('Finish work report'),
                ('Buy groceries'),
                ('Prepare for meeting')`)
    }catch(err){
        console.log(err);
    }
}

async function insertTags(){
    try{
        await pool.query(`INSERT INTO tags (name) VALUES
        ('urgent'),
        ('home'),
        ('office')
        ON CONFLICT (name) DO NOTHING`);
    }catch(err){
        console.log(err);
    }
}

async function linkTasksAndTags(){
    try{
        await pool.query(`INSERT INTO task_tags (task_id,tag_id) VALUES
        (1,1),
        (1,3),
        (2,2),
        (3,1),
        (3,3)`)
    }catch(err){
        console.log(err);
    }
}

async function getTasksWithTags() {
    try {
        const result = await pool.query(`
            SELECT tasks.id, tasks.title
            FROM tasks
            JOIN task_tags ON tasks.id = task_tags.task_id
            JOIN tags ON task_tags.tag_id = tags.id
            GROUP BY tasks.id, tasks.title;
        `);
        
        console.log(result.rows); 
    } catch (err) {
        console.log(err);
    }
}

async function run(){
    await createTags();
    await createTaskTags();
    await insertTask();
    await insertTags();
    await linkTasksAndTags();
    await getTasksWithTags();
    pool.end();
}

run().catch((err)=>console.log(err))