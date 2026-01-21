import jwt, {JwtPayload} from 'jsonwebtoken';
import express,{Request , Response, NextFunction, Router} from 'express'
import bcrypt from 'bcrypt';

const router = express.Router();
import {createUser,getUserByEmail} from '../AuthSecurity/authSecurity'


declare global {
  namespace Express {
    interface Request {
      user?: any;  
    }
  }
}

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    const user = await getUserByEmail(email);
  
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid credentials');
    }
  
 const token = jwt.sign({email: user.email},"JWT_SECRET")
  
    res.json({ token });
  });


function verifyToken(req:Request, res:Response, next:NextFunction) {
    const token = req.header('Authorization')?.replace('Bearer ', ''); 
    if (!token) {
      return res.status(400).send('Access denied');
    }
  
    try {
      const decoded = jwt.verify(token, 'JWT_SECRET');
      req.user = decoded; 
      next();  
    } catch (err) {
      res.status(400).send('Invalid or expired token');
    }
  }
  