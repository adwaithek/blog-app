import express from 'express';
import mongoose from 'mongoose';
import router from './routes/userRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import cors from 'cors'


const path=require('path')
const app=express();
app.use(cors());
app.use(express.json())

app.use("/api/user",router)
app.use("/api/blog",blogRouter)


//static files
app.use(express.static(path.join(__dirname,'./client/build')))
app.get('*',function(req,res){
res.sendFile(path.join(__dirname,'./client/build/index.html'))
});

mongoose.connect("mongodb+srv://admin:WkeZI2b8y2JGGCoq@cluster0.v8jangm.mongodb.net/Blog?retryWrites=true&w=majority").then(()=>
app.listen(3000)).then(()=>console.log("Connected to database")).catch((err)=>console.log(err))



