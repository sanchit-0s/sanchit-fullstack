import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

interface User {
    id:number,
    email:string,
}

async function createTables() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS usersDB (
                id SERIAL PRIMARY KEY,
                email TEXT UNIQUE
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS tasksDB (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                completed BOOLEAN DEFAULT FALSE,
                userId INTEGER REFERENCES usersDB(id)
            );
        `);

        console.log("Tables created.");
    } catch (err) {
        console.log( err);
    }
}

async function insertData() {
    try {
        await pool.query(`
            INSERT INTO usersDB (email) VALUES
            ('abc@gmail.com'),
            ('xyz@gmail.com')
            
        `);

        await pool.query(`
            INSERT INTO tasksDB (title, userId) VALUES
            ('Completing assignment', 1),
            ('Learning database', 2)
        `);

        console.log("Data inserted.");
    } catch (err) {
        console.log( err);
    }
}

async function getUser(id: number) :Promise<User | null>{
    try {
        const result = await pool.query(`SELECT * FROM usersDB WHERE id = $1`, [id]);
        return result.rows;
    } catch (err) {
        return err;
    }
}

async function createTask(userId: number, title: string) {
    try {
        await pool.query(`INSERT INTO tasksDB (title, userId) VALUES ($1, $2)`, [title, userId]);
        console.log("Task created");
    } catch (err) {
        console.log( err);
    }
}

async function getUserTasks(userId: number) {
    try {
        const result = await pool.query(`SELECT * FROM tasksDB WHERE userId = $1`, [userId]);
        console.log("User's tasks:", result.rows);
    } catch (err) {
        console.log( err);
    }
}

async function shutdown() {
    try {
        await pool.end();
        console.log("Shutdown gracefully.");
    } catch (err) {
        console.log("Error shutting down:", err);
    }
}

async function main() {
    await createTables();
    await insertData();

    const user = await getUser(1);
    console.log("User:", user);

    await createTask(1, 'New Task Example');

    await getUserTasks(1);

    await shutdown();
}

main().catch((err) => console.log(err));
