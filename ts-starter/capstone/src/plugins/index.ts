export interface Task {
    id: string;
    title: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    createdAt: Date;
  }
  
  export interface TaskPlugin {
    name: string;
    version: string;
    commands?: PluginCommand[];
    hooks?: PluginHooks;
  }
  
  export interface PluginCommand {
    name: string;
    description: string;
    handler: CommandHandler;
  }
  
  export type CommandHandler = (args: any) => void;
  
  export interface PluginHooks {
    onTaskCreated?: (task: Task) => void;
    onTaskUpdated?: (task: Task) => void;
    onTaskDeleted?: (task: Task) => void;
  }
  
  export class PluginManager {
    private plugins: TaskPlugin[] = [];
  
    loadPlugins(plugins: TaskPlugin[]): void {
      this.plugins = plugins;
    }
  
    executeCommand(pluginName: string, commandName: string, args: any): void {
      const plugin = this.plugins.find(p => p.name === pluginName);
      if (!plugin) {
        console.error(`Plugin ${pluginName} not found`);
        return;
      }
  
      const command = plugin.commands?.find(c => c.name === commandName);
      if (!command) {
        console.error(`Command ${commandName} not found in plugin ${pluginName}`);
        return;
      }
  
      command.handler(args);
    }
  
    callHooks(event: 'onTaskCreated' | 'onTaskUpdated' | 'onTaskDeleted', task: Task): void {
      this.plugins.forEach(plugin => {
        const hook = plugin.hooks?.[event];
        if (hook) {
          hook(task);
        }
      });
    }
  }
  