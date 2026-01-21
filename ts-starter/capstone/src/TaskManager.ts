import { Task } from "./types";
import { TaskStats,TaskCollection, calculateStats, taskCollection } from "./collection";


type TaskEvent='add' | 'update' | 'delete';
type TaskEventListener = (task:Task,event:TaskEvent)=>void;
export class TaskManager {
    private tasks: Map<string, Task>;
    private listeners: Set<TaskEventListener>;
  
    constructor(initialTasks: Task[]=[]){
        this.tasks= new Map(
            initialTasks.map(task=>[task.id,task])
        );
        this.listeners = new Set();
    };
  
    add(task: Omit<Task, 'id' | 'createdAt'>): Task{
        const newTask : Task={
            ...task,
            id:Math.random().toString(),
            createdAt: new Date()
        };
        this.tasks.set(newTask.id, newTask);
        this.emit(newTask, 'add');
        return newTask;
      }
    
      update(id: string, updates: Partial<Task>): Task {
        const existing = this.tasks.get(id);
        if (!existing) {
          throw new Error(` The task ${id} not found`);
        }
    
        const updated: Task = { ...existing, ...updates };
        this.tasks.set(id, updated);
        this.emit(updated, 'update');
        return updated;
      }
    
      delete(id: string): boolean {
        const task = this.tasks.get(id);
        if (!task) return false;
    
        this.tasks.delete(id);
        this.emit(task, 'delete');
        return true;
      }
    
      getStats(): TaskStats {
        return calculateStats([...this.tasks.values()]);
      }
    
      export(): TaskCollection {
        return taskCollection([...this.tasks.values()]);
      }
    
      on(listener: TaskEventListener): void {
        this.listeners.add(listener);
      }
    
      private emit(task: Task, event: TaskEvent): void {
        for (const listener of this.listeners) {
          listener(task, event);
        }
      }
    }
  