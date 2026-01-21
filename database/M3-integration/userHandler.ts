import { Request, Response } from 'express';
import { UserRepository } from './UserRepository';

export class UserHandler {
  constructor(private userRepository: UserRepository) {}

  async getUserById(req: Request, res: Response) {
    const user = await this.userRepository.read(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  }

  async createUser(req: Request, res: Response) {
    const newUser = await this.userRepository.create(req.body);
    return res.status(201).json(newUser);
  }
}
