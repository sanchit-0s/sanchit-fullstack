import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth/service';
import { UserDatabase } from '../database';
import Database from 'better-sqlite3';  

const db = new Database('db.sqlite');  

const userDb = new UserDatabase(db);
const authService = new AuthService(userDb);

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization']?.split(' ')[1]; 
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const decoded = authService.verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  next();
}
