import express, { Request, Response } from 'express';

const app = express();
const port = 3000;


interface EmailJob {
  id: number;
  type: string;
  status: string;
}


let jobQueue: EmailJob[] = [];

app.post('/email', (req: Request, res: Response): void => {
  const job: EmailJob = {
    id: Date.now(), 
    type: 'fake-email',
    status: 'queued',
  };
  
  jobQueue.push(job);
  console.log(`${job.id}`);
  console.log("done")
 
});


function processJobs() {
  setInterval(() => {
    const job = jobQueue.shift();  
    if (job) {
      console.log(`Processing job ${job.id}`);
      
    
      job.status = 'completed';
      console.log(`Job ${job.id} completed`);
    }
  }, 1000); 
}

function gracefulShutdown() {
  console.log('Shutting down');

  const interval = setInterval(() => {
    if (jobQueue.length === 0) {
      clearInterval(interval);  
      console.log('All jobs finished');
      process.exit(0);
    }
  }, 500);  
}

processJobs();

process.on('SIGINT', gracefulShutdown);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
