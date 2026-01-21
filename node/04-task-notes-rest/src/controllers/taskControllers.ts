import { Request, Response } from 'express';
import { taskSchema } from '../models/task';
import TaskService from '../services/taskService';


export const getAllTasks = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, filter = '', sort = 'createdAt' } = req.query;
  const tasks = await TaskService.getAllTasks(Number(page), Number(limit), String(filter), String(sort));
  res.status(200).json({ tasks });
};

export const getTaskById = async (req: Request, res: Response) => {
  const task = await TaskService.getTaskById(req.params.id);
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const validatedTask = taskSchema.parse(req.body);
    const task = await TaskService.createTask(validatedTask);
    res.status(201).json(task);
  } catch (e) {
    res.status(400).json({ error: 'Invalid task data', details: e.errors });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const validatedTask = taskSchema.parse(req.body);
    const task = await TaskService.updateTask(req.params.id, validatedTask);
    res.status(200).json(task);
  } catch (e) {
    res.status(400).json({ error: 'Invalid task data', details: e.errors });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  await TaskService.deleteTask(req.params.id);
  res.status(204).send();
};
