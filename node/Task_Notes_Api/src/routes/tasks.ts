import { Router, Request, Response } from 'express';
import { Task } from '../models/task';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid'; 

export const taskRouter = Router();

let tasks: Task[] = [];

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  completed: z.boolean(),
  priority: z.enum(['low', 'medium', 'high']),
});

const paginationSchema = z.object({
  page: z.number().int().min(1, 'Page must be at least 1').default(1),
  limit: z.number().int().min(1, 'Limit must be at least 1').max(100, 'Limit must not exceed 100').default(10),
});

taskRouter.get('/tasks', (req: Request, res: Response) => {
  try {
    const { page, limit } = paginationSchema.parse(req.query);

    const paginatedTasks = tasks.slice((page - 1) * limit, page * limit);
    res.status(200).json({
      data: paginatedTasks,
      meta: {
        total: tasks.length,
        page,
        limit,
      },
    });
  } catch (err) {
    res.status(400).json({ error: 'Invalid pagination parameters' });
  }
});

taskRouter.post('/tasks', (req: Request, res: Response) => {
  try {
    const taskData = taskSchema.parse(req.body);

    const newTask: Task = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description,
      completed: taskData.completed,
      priority: taskData.priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: 'Invalid task data', details: err.errors });
  }
});

taskRouter.get('/tasks/:id', (req: Request, res: Response) => {
  const taskId = req.params.id;
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.status(200).json(task);
});

taskRouter.put('/tasks/:id', (req: Request, res: Response) => {
  const taskId = req.params.id;
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  try {
    const taskData = taskSchema.parse(req.body);

    task.title = taskData.title;
    task.description = taskData.description || task.description;
    task.completed = taskData.completed;
    task.priority = taskData.priority;
    task.updatedAt = new Date().toISOString();

    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Invalid task data', details: err.errors });
  }
});

taskRouter.delete('/tasks/:id', (req: Request, res: Response) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);

  res.status(204).send(); 
});
