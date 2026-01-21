import db from '../AuthSecurity/db';
 import express,{Router} from 'express';
 import bcrypt from 'bcrypt';

 const router = express.Router();
 import jwt from 'jsonwebtoken'
 interface User {
    id: number;
    email: string;
    password_hash: string;
    role: string;
  }
  

 async function passHash(password:string):Promise<string>{

   const salt = 10;
   try{
      const hashPassowrd = await bcrypt.hash(password,salt);
      console.log(hashPassowrd)
      return hashPassowrd

   }catch(err){
      throw new Error("error while hashing the password")
   }
}

passHash("sanchit");

async function verifyPassword(plaintextPassword: string, hashedPassword: string): Promise<boolean> {
   try {
     
     const isMatch = await bcrypt.compare(plaintextPassword, hashedPassword);
     console.log('Password match:', isMatch);
     return isMatch;
   } catch (error) {
     console.error('Error verifying password:', error);
     throw new Error('Error verifying password');
   }
 }

 async function createUser(email: string, plainPassword: string, role: string): Promise<void> {
    const passwordHash = await passHash(plainPassword);
  
    const insertQuery = `INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?);`;
    const stmt = db.prepare(insertQuery);
    stmt.run(email, passwordHash, role);
    console.log('User created successfully');
  }
  
  function getUserByEmail(email: string) :User| null{
    const selectQuery = `SELECT * FROM users WHERE email = ?;`;
    const stmt = db.prepare(selectQuery);
    const user =  stmt.get(email) as User | null;
    return user;
  }
  
  router.post('/createUser', async (req, res) => {
    const { email, password, role } = req.body;
  
    try {
      await createUser(email, password, role);  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  });
  
  
  router.post('/verifyPassword', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = getUserByEmail(email);
      if (user) {
        const isMatch = await verifyPassword(password, user.password_hash);
        if (isMatch) {
          res.status(200).json({ message: 'Password is correct' });
        } else {
          res.status(400).json({ error: 'Invalid password' });
        }
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error verifying password' });
    }
  });