
import { Task,Priority } from "./types";

export interface TaskCollection {
    tasks: Task[];
    metadata: {
      total: number;
      completed: number;
      lastModified: Date;
    };
  }
  
  export interface TaskStats {
    byPriority: Record<Priority, number>;
    byStatus: Record<string, number>;
    averageAge: number;
  }

export function taskCollection(tasks:Task[]):TaskCollection{
    const completed = tasks.filter(t=>t.completed).length;
    return {
        tasks,
    metadata: {
      total: tasks.length,
      completed,
      lastModified: new Date(),
    },
    };
}


export function  calculateStats(tasks:Task[]):TaskStats{
   const byPriority:Record<Priority,number>={
      low:0,
      medium:0,
      high:0,
   };

   const  byStatus: Record<string, number>={
    completed:0,
    pending:0
   };
   let TotalAge=0;
   const now= Date.now()
   for(const task of tasks){
   byPriority[task.priority]++;

   if(task.completed){
    byStatus.completed++
   }else{
    byStatus.pending++;
   }
      TotalAge += now - task.createdAt.getTime() 
  
  }
    return {
      byPriority,
      byStatus,
      averageAge: tasks.length? TotalAge / tasks.length:0
    }
}