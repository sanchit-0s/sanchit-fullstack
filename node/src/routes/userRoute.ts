import express from 'express';

const router = express.Router();


router.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`)
    next();
})
router.get('/api',(req,res)=>{
    res.json({msg:"new route"})
})


router.get('/:id',(req,res)=>{
    const data = req.params.id;
    res.json({id :data});
})
export default router;