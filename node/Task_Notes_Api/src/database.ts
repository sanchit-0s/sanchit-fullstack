import Database from 'better-sqlite3';

export interface User {
  id: number;  
  email: string;
  password_hash: string;
  role: 'user' | 'admin';
  created_at: string;
}

export class UserDatabase {
  private db: Database.Database;

  constructor(db: Database.Database) {
    this.db = db;
    this.initialize();
  }

  private initialize(): void {
    try {
      this.db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          role TEXT CHECK(role IN ('user', 'admin')) DEFAULT 'user',
          created_at TEXT NOT NULL
        );
      `);
    } catch (err) {
      console.error('Error initializing database: ', err);
    }
  }

  createUser(email: string, passwordHash: string, role: 'user' | 'admin'): User {
    const stmt = this.db.prepare(`
      INSERT INTO users (email, password_hash, role, created_at)
      VALUES (@email, @password_hash, @role, @created_at);
    `);
    const createdAt = new Date().toISOString();
    try {
      const info = stmt.run({ email, password_hash: passwordHash, role, created_at: createdAt });
      return { 
        id: Number(info.lastInsertRowid), 
        email,
        password_hash: passwordHash,
        role,
        created_at: createdAt,
      };
    } catch (err) {
      console.error('Error creating user: ', err);
      throw new Error('Error creating user');
    }
  }

  getUserByEmail(email: string): User |null{
    const stmt = this.db.prepare(`SELECT * FROM users WHERE email = ?`);
    try {
      const user = stmt.get(email) as User;
      if (!user) {return null}
else{
      return {
        id: Number(user.id),  
        email: user.email,
        password_hash: user.password_hash,
        role: user.role,
        created_at: user.created_at,
      };
    }
    } catch (err) {
      console.error('Error fetching user by email: ', err);
      return null;  
    }
  }

  getUserById(id: number): User | null {
    const stmt = this.db.prepare(`SELECT * FROM users WHERE id = ?`);
    try {
      const user = stmt.get(id) as User;
      if (!user) return null;

      return {
        id: Number(user.id),  
        email: user.email,
        password_hash: user.password_hash,
        role: user.role,
        created_at: user.created_at,
      };
    } catch (err) {
      console.error('Error fetching user by ID: ', err);
      return null; 
    }
  }
}
