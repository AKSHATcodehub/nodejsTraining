import express, { Application } from "express";
import routes from "./routes/routes";

import { connectDB } from "./database/db";
const app:Application = express()
app.use(express.json())


app.listen(4100,()=>{
    console.log("listening at 4100");   
    routes(app); 
    connectDB()
})
