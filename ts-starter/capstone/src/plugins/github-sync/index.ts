import { TaskPlugin, PluginCommand, Task } from '../index';

const syncWithGitHubCommand: PluginCommand = {
  name: 'syncWithGitHub',
  description: 'Sync tasks with GitHub Issues',
  handler: () => {
    console.log(`Syncing tasks with GitHub...`);
  },
};

export const githubSyncPlugin: TaskPlugin = {
  name: 'github-sync',
  version: '1.0.0',
  commands: [syncWithGitHubCommand],
  hooks: {
    onTaskCreated: (task: Task) => {
      console.log(`Syncing task to GitHub: ${task.title}`);
    },
  },
};
