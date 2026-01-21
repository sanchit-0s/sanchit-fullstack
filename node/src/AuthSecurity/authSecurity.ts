import bcrypt from 'bcrypt'
import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
 import db from './db'

 import dotenv from 'dotenv';
 dotenv.config();

 db.prepare(`
 CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL
 )
 `).run();

 console.log("Users table is created")


 interface User {
  id: number;
  email: string;
  password_hash: string;
  role: string;
}
 export function createUser(email: string, passwordHash: string, role: string): void {
  const insertQuery =  `INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?);`;
  const stmt = db.prepare(insertQuery);
  stmt.run(email, passwordHash, role);
}

export function getUserByEmail(email: string):User | null{
  const selectQuery = `SELECT * FROM users WHERE email = ?;`;
  const stmt = db.prepare(selectQuery);
  return stmt.get(email) as User | null;
}

function closeDb(): void {
  db.close();
}

process.on('exit', closeDb);
process.on('SIGINT', () => { 
  closeDb();
  process.exit(0);
});
process.on('SIGTERM', () => { 
  closeDb();
  process.exit(1);
});

// Example usage
createUser('test@example.com', 'hashed_password_123', 'user');
const user = getUserByEmail('test@example.com');
console.log(user); 


















