import {Task} from './types'
import {createTask,markCompleted,filterByStatus,sortByPriority} from './operation'
import { TaskCollection,calculateStats, taskCollection } from './collection';
import { TaskManager } from './TaskManager';
import { title } from 'process';

const task01 : Task={
 id : "a",
 title: "assignment completion",
 completed: true,
 priority:'high',
 createdAt:new Date()

}
console.log(task01);


const task1= createTask('completing ts module','high')
const task2= createTask('completing node module','medium');
const task3= createTask('complete progressive project','low')


const tasks=[
    task1,
    markCompleted(task2),
    task3
];

// console.log(tasks);


// console.log("completed task: ", filterByStatus(tasks,true))

// console.log("filter", filterByStatus(tasks,true))

// console.log("sort",sortByPriority(tasks))

// const collection= taskCollection(tasks)
// console.log(collection)

// const stats = calculateStats(tasks);
// console.log(stats);

const manager = new TaskManager();
manager.on((task,action)=>{
    console.log(`event ${action}:`, task.title)
})

const t1=manager.add({
    title:"beign the nodejs module",
    completed: false,
    priority:"high",

})

manager.update(t1.id,{title:"begin nextjs"});
manager.delete(t1.id);

console.log('stats', manager.getStats())
console.log('export', manager.export())