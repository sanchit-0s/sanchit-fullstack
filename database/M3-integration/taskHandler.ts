import { Request, Response } from 'express';
import { TaskRepository } from './TaskRepository';

export class TaskHandler {
  constructor(private taskRepository: TaskRepository) {}

  async getTasksByUser(req: Request, res: Response) {
    const tasks = await this.taskRepository.read(req.params.userId);
    return res.json(tasks);
  }

  async completeTask(req: Request, res: Response) {
    const updatedTask = await this.taskRepository.markComplete(req.params.id);
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    return res.json(updatedTask);
  }
}
