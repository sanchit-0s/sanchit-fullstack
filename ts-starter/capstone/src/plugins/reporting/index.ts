import { TaskPlugin, PluginCommand, Task } from '../index';

const generateReportCommand: PluginCommand = {
  name: 'generateReport',
  description: 'Generates a report of tasks in the system',
  handler: (args) => {
    const { total, completed, pending } = args;
    console.log(`Report generated:`);
    console.log(`Total Tasks: ${total}`);
    console.log(`Completed Tasks: ${completed}`);
    console.log(`Pending Tasks: ${pending}`);
  },
};

export const reportingPlugin: TaskPlugin = {
  name: 'reporting',
  version: '1.0.0',
  commands: [generateReportCommand],
  hooks: {
    onTaskCreated: (task: Task) => {
      console.log(`New task created: ${task.title}`);
    },
    onTaskUpdated: (task: Task) => {
      console.log(`Task updated: ${task.title}`);
    },
  },
};
