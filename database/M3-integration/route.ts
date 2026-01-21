import express from 'express';
import { UserHandler } from './userHandler';
import { TaskHandler } from './taskHandler';
import { UserRepository } from './UserRepository';
import { TaskRepository } from './TaskRepository';

const userRepository = new UserRepository();

const taskRepository = new TaskRepository();

const userHandler = new UserHandler(userRepository);
const taskHandler = new TaskHandler(taskRepository);

const app = express();

app.use(express.json());

app.get('/users/:id', (req, res) => userHandler.getUserById(req, res));

app.post('/users', (req, res) => userHandler.createUser(req, res));

app.get('/tasks/:userId', (req, res) => taskHandler.getTasksByUser(req, res));
app.put('/tasks/:id/complete', (req, res) => taskHandler.completeTask(req, res));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
