import { BaseRepository } from './BaseRepository';

interface Task {
  id: string;
  title: string;
  userId: string;
  completed: boolean;
}

export class TaskRepository extends BaseRepository<Task> {
  private tasks: Task[] = [];

  async create(task: Task): Promise<Task> {
    this.tasks.push(task);
    return task;
  }

  async read(id: string): Promise<Task | null> {
    return this.tasks.find(task => task.id === id) || null;
  }

  async update(id: string, task: Task): Promise<Task> {
    const index = this.tasks.findIndex(existingTask => existingTask.id === id);
    if (index === -1) throw new Error('Task not found');
    this.tasks[index] = { ...this.tasks[index], ...task };
    return this.tasks[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) return false;
    this.tasks.splice(index, 1);
    return true;
  }

  async findByUser(userId: string): Promise<Task[]> {
    return this.tasks.filter(task => task.userId === userId);
  }

  async markComplete(id: string): Promise<Task | null> {
    const task = await this.read(id);
    if (!task) return null;
    task.completed = true;
    return task;
  }
}
