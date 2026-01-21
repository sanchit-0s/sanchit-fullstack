import { Router, Request, Response } from 'express';
import { AuthService } from '../auth/service';
import { UserDatabase } from '../database'; 
import Database from 'better-sqlite3';

const db = new Database('db.sqlite');
const userDb = new UserDatabase(db);  

const authService = new AuthService(userDb);

export const authRouter = Router();

authRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    const newUser = await authService.register(email, password, role);
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
