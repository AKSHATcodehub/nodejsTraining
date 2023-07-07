import express from 'express';
import { Application } from 'express';
import dotenv from 'dotenv';
import Server from './src';

dotenv.config()
const port = process.env.PORT
const app:Application=express();

const server:Server = new Server(app);

app.listen(port,()=>{
    console.info(`Server running on : http://localhost:${port}`);
 
})
