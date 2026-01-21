import express from 'express';
import {z} from 'zod'
const app = express();


let tasks = [
    {id:1, taskName:"nodejs"},
    {id:2,taskName:"typescript"}
]

const taskSchema = z.object({
    taskName:z.string().min(1,{message:"name is required"}),
    status: z.enum(["completed","remaining"]),
    id: z.number()
})

app.use(express.json());

app.post('/company',(req,res)=>{
    const {companyName, website, industry} = req.body;

    const company= {
        companyName,
        website,
        industry
    }

res.json(company);
})

const companySchema = z.object({
    comapnyName:z.string().min(1),
    website: z.string().min(1),
    industry:z.string().min(1)
})

app.post('/company-zod',(req,res)=>{
    const result = companySchema.safeParse(req.body);
    if(!result.success) return res.status(400).json({error: result.error.issues})

    res.json(result.data)
})













app.post('/TASKS',(req,res)=>{
    const task = taskSchema.safeParse(req.body);
    if(!task.success) res.status(400).json({Erros : task.error.issues});
    
    res.status(201).json({
        data : task.data,
    })
    
})

app.post("/tasks",(req,res)=>{
    const task = req.body;
    task.id = tasks.length+1;
    tasks.push(task);
    res.status(200).json({
        messgae : "task is created successfully",
        task
    })
})


app.get('/tasks',(req,res)=>{
    res.json(tasks);
})


app.get('/tasks/:id',(req,res)=>{
    const id = Number(req.params.id);
    const task =tasks.find(t => t.id === id)
    if(task){
    res.json(task)
}else{
    res.status(404).json({message:"Not found"});
}
})

app.put('/tasks/:id',(req,res)=>{
    const id = Number(req.params.id);
    const task = tasks.find(t=>t.id===id);
    if(task){
        task.taskName= req.body.taskName;

    res.json(task)
    }else{
        res.status(404).json("not found")
    }
})


app.delete('/tasks/:id',(req,res)=>{
    const id = Number(req.params.id);
    tasks = tasks.filter(t=>t.id!==id);

    res.status(204).json()
})

app.listen(3001,()=>{
    console.log('server is running')
})