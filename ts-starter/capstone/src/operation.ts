

import { Task,Priority } from "./types";
export function createTask(title: string, priority: Priority = 'medium'): Task{
    return {
        id:Math.random().toString(),
        title,
        completed:false,
        priority,
        createdAt:new Date()
    }
};
export function markCompleted(task: Task): Task{
    return {
        ...task,completed:true
    }
};
export function filterByStatus(tasks: Task[], status: boolean): Task[]{
    return tasks.filter(task => task.completed=== status)
    
};
export function sortByPriority(tasks: Task[]): Task[]{
        const order :Record<Priority,number>= {
            low:3,
            medium:2,
            high:1,
        };
        return [...tasks].sort((a,b)=>order[a.priority]-order[b.priority]);
    
};