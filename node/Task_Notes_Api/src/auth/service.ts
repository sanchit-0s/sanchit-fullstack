import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserDatabase, User } from '../database';

const JWT_SECRET = 'your_jwt_secret'; 
const JWT_EXPIRATION = '1h'; 
export interface JWTPayload {
  userId: number;
  email: string;
  role: 'user' | 'admin';
}

export class AuthService {
  private userDb: UserDatabase;

  constructor(userDb: UserDatabase) {
    this.userDb = userDb;
  }

  async register(email: string, password: string, role: 'user' | 'admin'): Promise<User> {
    const existingUser = this.userDb.getUserByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = this.userDb.createUser(email, passwordHash, role);
    return newUser;
  }

  async login(email: string, password: string): Promise<string> {
    const user = this.userDb.getUserByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const payload: JWTPayload = { userId: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    return token;
  }

  verifyToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (err) {
      return null;
    }
  }
}
