import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); 

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  
});

async function retryQuery(query: string, retries: number = 3, delay: number = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        const result = await pool.query(query);
        return result; 
      } catch (error) {
        console.log(error);
        }
        if(i<retries-1){
            console.log("Retrying");
            await new Promise(resolve => setTimeout(resolve, delay));
        }
         
      }
      throw new Error('All retry attempts failed');
    }
  
  

const app = express();
const port = 3000;

app.get('/health', async (req: Request, res: Response) => {
  try {
    await retryQuery('SELECT 1');
    res.status(200).json({ status: 'Ok' });
  } catch (error) {
    res.status(500).json({error: 'Database connection failure' });
  }
});

process.on('SIGINT', async () => {
  console.log('Shutting down gracefully');
  await pool.end();  
  process.exit(0);   
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
