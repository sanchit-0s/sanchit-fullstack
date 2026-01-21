import {Pool} from 'pg';
import dotenv from 'dotenv'

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

async function alterTasks(){
    try{
        await pool.query(`ALTER TABLE tasks
                          ADD COLUMN category_id INTEGER REFERENCES categories(id) `)
    }catch(err){
        console.log(err);
    }
}
async function insertTasks() {
    try {
        
        await pool.query(`
            INSERT INTO tasks (title, category_id)
            VALUES
                ('Finish work report', 1),
                ('Buy groceries', 3),
                ('Prepare for meeting', 1),
                ('Buy shoes', 3);
        `);
        
    } catch (err) {
        console.log( err);
    }
}
async function createCategory(){
    try{
        await pool.query(`CREATE TABLE IF NOT EXISTS categories(
            id SERIAL PRIMARY KEY,
            name TEXT UNIQUE,
            color TEXT
        )`)
    }catch(err){
        console.log(err)
    }
}

async function insertCategory(){
    try{
        await pool.query(`INSERT INTO categories (name,color) VALUES
                          ('Work','black'),
                          ('Personal','blue'),
                          ('Shopping','white')
                          ON CONFLICT (name) DO NOTHING;`)
    }catch(err){
        console.log(err);
    }
}

async function updateTask(){
    try{
            await pool.query(
                `UPDATE tasks
                SET category_id = (SELECT id FROM categories WHERE name= 'Work')
                    WHERE title ILIKE '%work%';`
            )
            await pool.query(`
            UPDATE tasks
            SET category_id = (SELECT id FROM categories WHERE name= 'Personal')
            WHERE title ILIKE '%personal%';

            `)
            await pool.query(`
            UPDATE tasks
            SET category_id = (SELECT id FROM categories WHERE name='Shopping')
            WHERE title ILIKE '%shopping%';`)
    }catch(err){
        console.log(err);
    }
}

async function groupTask(){
    try{
   const result=  await pool.query(
        ` SELECT t.title, c.name
            FROM tasks t
            join categories c
            on t.category_id = c.id
        
        `
   
        )
        console.log(result.rows)
}catch(err){
    console.log(err);
}
}

async function allFunction(){
    await alterTasks();
    await insertTasks();
    await createCategory();
    await insertCategory();
    await updateTask();
    await groupTask();
    pool.end();
}

allFunction().catch((err)=>console.log(err));