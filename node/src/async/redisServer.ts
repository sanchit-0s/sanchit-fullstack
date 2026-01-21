import express from 'express';
import { Queue } from 'bullmq';
import { Redis } from 'ioredis';

const redis = new Redis();

const emailQueue = new Queue('send-email', {
  connection: redis, 
});

const app = express();
const port = 3000;

app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { email, subject, body,idempotencyKey } = req.body;

  if (!email || !subject || !body || !idempotencyKey) {
    return res.status(400).json({ error: 'Missing required data' });
  }
 
  const existingJob = await emailQueue.getJob(idempotencyKey);
  if (existingJob) {
    return res.status(409).json({ error: `Job with ${idempotencyKey} already exists.` });
  }
  const job = await emailQueue.add('email-job', {
    email,
    subject,
    body,
  },{
    jobId: idempotencyKey,
  attempts: 5,      
  backoff: {
    type: 'exponential',
    delay: 1000,         
  }, });

  res.json({ message: 'Email isadded!', jobId: job.id });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
