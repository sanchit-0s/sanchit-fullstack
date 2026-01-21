import { Worker, Job } from 'bullmq';
import { Redis } from 'ioredis';

const redis = new Redis({
    host: 'localhost',    
    port: 6379,          
    maxRetriesPerRequest: null,
});

const worker = new Worker(
  'send-email',  
  async (job: Job<any, any, string> ) => {
   
    const { email, subject, body } = job.data;

    console.log(`Sending email to: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body}`);

   
    if (Math.random() < 0.3) {
      
      throw new Error('Simulated email failure');
    }

    console.log(`Email successfully sent to ${email}`);
  },
  {
    connection: redis,  
    concurrency: 5, 
  }
);

worker.on('completed', (job) => {
    const timestamp = new Date();
  if (job) {
    console.log(`Job ${job.id} completed successfully! at time ${timestamp}`);
  }
});

worker.on('failed', (job, err) => {
    const timestamp = new Date();
  if (job) {
    console.error(`Job ${job.id} failed with error: ${err.message} at ${timestamp}`);
  }
});
