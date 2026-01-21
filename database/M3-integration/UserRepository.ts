
import { BaseRepository } from './BaseRepository';

interface User {
  id: string;
  name: string;
  email: string;
}

export class UserRepository extends BaseRepository<User> {
  private users: User[] = [];

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async read(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async update(id: string, user: User): Promise<User> {
    const index = this.users.findIndex(existingUser => existingUser.id === id);
    if (index === -1) throw new Error('User not found');
    this.users[index] = { ...this.users[index], ...user };
    return this.users[index];
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.users.length;
    this.users = this.users.filter(user => user.id !== id); 
    return this.users.length < initialLength; 
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }
}
