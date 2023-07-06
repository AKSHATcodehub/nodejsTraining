import express from 'express';
import { Application } from 'express';
import dotenv from 'dotenv';
import Server from './src';
import swaggerDocs from './src/utils/swagger';
dotenv.config()
const port = process.env.PORT
const app:Application=express();

const server:Server = new Server(app);

app.listen(port,()=>{
    console.info(`Server running on : http://localhost:${port}`);
    swaggerDocs(app,port)
}).on('error',(err:any)=>{
    if (err.code === 'EADDRINUSE') {
        console.log('server startup error: address already in use');
    } else {
        console.log(err);
    }
})
