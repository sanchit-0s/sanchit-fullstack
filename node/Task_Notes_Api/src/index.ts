// import express from 'express';
// import { loadConfig } from './config';
// import { createLogger } from './logger';
// import { FileStorage } from './storage';
// import { TaskEventEmitter } from './events';
// import { v4 as uuidv4 } from 'uuid';

// const app = express();
// const config = loadConfig();
// const logger = createLogger(config);

// const storage = new FileStorage('./data/notes.json');
// const eventEmitter = new TaskEventEmitter();

// app.use(express.json());

// app.post('/tasks', async (req, res) => {
//   const newTask = { id: uuidv4(), ...req.body };
//   eventEmitter.emitTaskCreated(newTask);
//   let tasks = await storage.loadNotes();
//   tasks.push(newTask);
//   await storage.saveNotes(tasks);
//   logger.info('Task created');
//   res.status(201).json(newTask);
// });

// storage.watchChanges(() => {
//   logger.info('File has been updated, reloading tasks...');
// });

// eventEmitter.on('taskCreated', (task) => {
//   logger.info(`Task created: ${task.id}`);
// });

// eventEmitter.on('taskUpdated', (task) => {
//   logger.info(`Task updated: ${task.id}`);
// });

// eventEmitter.on('taskDeleted', (taskId) => {
//   logger.info(`Task deleted: ${taskId}`);
// });

// app.listen(config.port, () => {
//   logger.info(`Server running on port ${config.port} in ${config.env} mode`);
// });

import { loadConfig } from './config';
import { TaskServer } from './server';
import { createLogger } from './logger'; 

const config = loadConfig();

const logger = createLogger(config);  

const taskServer = new TaskServer(config);

taskServer.start().catch((err) => {
  logger.error('Failed to start the server:', err);  
  process.exit(1);
});

const shutdown = async () => {
  logger.info('Received termination signal, shutting down gracefully...'); 
  await taskServer.stop();
  process.exit(0);
};

process.on('SIGINT', shutdown); 
process.on('SIGTERM', shutdown); 
