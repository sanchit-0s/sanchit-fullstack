import {Pool} from 'pg';
import dotenv from 'dotenv'

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})


async function createOrders(){
    try{
            await pool.query(`CREATE TABLE IF NOT EXISTS orders (
                id INT PRIMARY KEY,
                customer_name VARCHAR(255),
                customer_email VARCHAR(255),
                product_name VARCHAR(255),
                price DECIMAL(10, 2)
            )`)
    }catch(err){
        console.log(err)
    }
}

async function insertOrders() {
    try{
        await pool.query(`INSERT INTO orders (id, customer_name, customer_email, product_name, price)
        VALUES
        (1, 'user1', 'user1@gmail.com', 'books', 1000),
        (2, 'user1', 'user1@gmail.com', 'computer', 2000),
        (3, 'user2', 'user2@gmail.com', 'mouse', 50),
        (4, 'user1', 'user1@gmail.com', 'monitor', 300)
        ON CONFLICT (id) DO NOTHING;
        `)
    }
    catch(err){console.log(err)};
}

async function createCustomers(){
    try{
        await pool.query(`CREATE TABLE IF NOT EXISTS customers(
            customer_id SERIAL PRIMARY KEY,
            customer_name VARCHAR(255),
            customer_email VARCHAR(255)
        )`)

        await pool.query(`INSERT INTO customers (customer_name,customer_email)  VALUES 
        ('user1','user1@gmail.com'),
        ('user2','user2@gmail.com')`)
    }catch(err){console.log(err)}
}

async function productData(){
    try{
        await pool.query(`CREATE TABLE IF NOT EXISTS products(
            id SERIAL PRIMARY KEY,
            product_name VARCHAR(255),
            price DECIMAL(10,2),
            customer_id INTEGER REFERENCES customers(customer_id)
        )`)

        await pool.query(`INSERT INTO products (id,product_name,price,customer_id) VALUES
        (1,'books',1000,1),
        (2,'computer',2000,1),
        (3,'mouse',50,2),
        (4,'monitor',300,1)`)

        await pool.query(`UPDATE customers
        SET customer_email = 'user1@gmail.com'
        WHERE customer_id = 1`)
    }catch(err){
        console.log(err);
    }
}

async function join(){
    try{
      const result =  await pool.query(`SELECT p.id, p.product_name,p.price,c.customer_email
        FROM products p
        JOIN customers c
        ON p.customer_id= c.customer_id
        WHERE c.customer_name= 'user1'`)

        console.log(result.rows);
    }catch(err){
        console.log(err);
    }
}

async function final(){
    await createOrders();
    await insertOrders();
    await createCustomers();
    await productData();
    await join();
    pool.end();
}

final().catch((err)=>console.log(err));