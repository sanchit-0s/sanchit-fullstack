import express, { NextFunction, urlencoded,Request,Response } from 'express';
import dotenv from 'dotenv';
import 'async-express-error'
import path from 'path'
import e from 'express';
import {v4 as uuid}  from 'uuid';
// import cors from 'cors';
import router from './routes/userRoute'
// dotenv.config();
const app = express()

const port =3000;
// app.use(cors);

// app.use((req,res,next)=>{
//     console.log(`${req.method} ${req.url}`)
//     next();
// })

app.use(express.static(path.join(__dirname,'public')))


app.use((req,res,next)=>{
    const start = Date.now();

    res.on('finish',()=>{
        const time = Date.now()- start;
        console.log(`${req.method} ${req.url} ${time}`);

    })
    next();
});
interface RequestWithId extends Request{
    id?:string;
}

app.use((req:RequestWithId,res:Response,next:NextFunction)=>{
    req.id= uuid();
    res.set('request-id',req.id);
    
})

app.use(express.json())
app.use(express.urlencoded({extended:true,limit:'1mb'}))




app.use('/api',router)

app.get('/',(req:RequestWithId,res)=>{
    res.status(200).send("hello");
    // console.log(req.id);
})

app.get('/ping',(req,res)=>{
    res.send({ok:true});
})

// app.get('/users/:id',(req,res)=>{
//     const data = req.params.id;
//     res.json(data);
// })

// app.get('/search',(req,res)=>{
// const data = req.query.q || ' ';
// res.json({"query": data});
// })
app.get('/users/:id/posts', (req, res) => {
    const userId = req.params.id;          
    const limit = req.query.limit || 10;   
  
    res.json({
      userId,
      posts: limit,
      
    });
  });
 

  app.post('/echo',(req,res)=>{
   const body= req.body;
   if(!body){
    res.status(404).send("not found")
   }
    res.status(201).json(body)
   
  })
  app.post('/user',(req,res)=>{
    const {name,id}= req.body;
    if(!name || ! id){
        res.status(400).json("data is missing");
    }
  })

  app.get('/custom-headers',(req,res)=>{
    res.set({
        'id':'4545',
        'subject':'nodejs'
    })
    res.send("hello nodejs");
  })
 


app.get('/files',(req,res)=>{
    const data = path.join(__dirname, '..', 'source.txt');
    res.sendFile(data);
    // res.redirect('/');
})

app.get('/error',(req,res)=>{
    throw new Error("Something went wrong")
})



app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
    console.log(err.message);
    res.json({
        error: "something went wrong",
        message: err.message,
    })
})












  app.use((req, res) => {
    res.status(404).json({ error: 'page not found' });
  });

  



  app.listen(port,()=>{
    console.log("server is running at ",{port})
})
