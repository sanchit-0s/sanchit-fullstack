import express, {Router} from 'express';
import bcrypt from 'bcrypt';
const router = express.Router();
import {createUser, getUserByEmail} from '../AuthSecurity/authSecurity'
import db from '../AuthSecurity/db';

interface user {
    email:string,
    hashedPassword:string,
    role:string
}

router.post('/register',async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"email and password are needed"});
    }

    try{
        const existingUser = await getUserByEmail(email);
        if(existingUser){
            res.status(400).json({message:"user is already registered"})
        }

        const hashedPassword = await bcrypt.hash(password,10);

         createUser(email,hashedPassword,'user');

        return res.status(201).json({message: "user created successfully"})
    }catch(err){
        return res.status(500).json({message : "something went wrong"})
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
  
    try {
      const user = await getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
      const isMatch = await bcrypt.compare(password,user.password_hash);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
      return res.status(200).json({ message: "Login successful" });
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong, please try again" });
    }
  });