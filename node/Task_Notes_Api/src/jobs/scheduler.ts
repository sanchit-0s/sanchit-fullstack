import { Queue } from 'bull';
import { Job } from 'bull';



export class TaskScheduler {
  constructor(private queue: Queue) {}

  async scheduleReminder(taskId: string, dueDate: Date): Promise<void> {
    const delay = dueDate.getTime() - Date.now();
    
    await this.queue.add('sendReminder', { taskId }, { delay });

    console.log(`Reminder scheduled for task ${taskId} at ${dueDate}`);
  }

  async scheduleCleanup(): Promise<void> {
    await this.queue.add('cleanupTasks', {}, { repeat: { cron: '0 0 * * *' } });

    console.log('Cleanup job scheduled');
  }
}
