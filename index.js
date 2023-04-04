
import mongoose from 'mongoose';
import  Express  from 'express';
import router from './routes/userRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url';



dotenv.config()

// connectDB();


const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

// const path=require('path')
const app=Express();
app.use(cors());
app.use(Express.json())

app.use(morgan('dev'))

app.use(Express.static(path.join(__dirname, './client/build')))


app.use("/api/user",router)
app.use("/api/blog",blogRouter)


//static files
// app.use(express.static(path.join(__dirname,'./client/build')))
// app.get('*',function(req,res){
// res.sendFile(path.join(__dirname,'./client/build/index.html'))
// });

app.use("*",function(req,res){
    res.sendFile(path.join(__dirname, '../e-commerce/build/index.html'));
})


const PORT=process.env.PORT || 3000

const MONGO=process.env.MONGO

mongoose.connect(MONGO).then(()=>
app.listen(PORT)).then(()=>console.log("Connected to database")).catch((err)=>console.log(err))



