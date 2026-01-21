import express from 'express';
import taskRoutes from './routes/taskRoutes';
import { logMiddleware } from './logger';
import { getMetrics } from './metrics';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(express.json());       
app.use(logMiddleware);         

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Notes API',
      version: '1.0.0',
      description: 'A simple API for managing tasks and notes.',
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/tasks', taskRoutes);

app.get('/metrics', getMetrics);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
