import { Task } from '../models/task';

let tasks: Task[] = []; 

const getAllTasks = (page: number, limit: number, filter: string, sort: string) => {
  let result = tasks.filter((task) => task.title.includes(filter));
  result = result.sort((a, b) => (a[sort] > b[sort] ? 1 : -1));
  return result.slice((page - 1) * limit, page * limit);
};

const getTaskById = (id: string) => tasks.find(task => task.id === id);

const createTask = (task: Task) => {
  tasks.push(task);
  return task;
};

const updateTask = (id: string, task: Task) => {
  const index = tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...task };
    return tasks[index];
  }
  throw new Error('Task not found');
};

const deleteTask = (id: string) => {
  tasks = tasks.filter(task => task.id !== id);
};

export default { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
