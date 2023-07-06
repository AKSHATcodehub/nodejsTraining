import { Application } from "express";
import sumController from "../controllers/sum.controller";
import allroutes from "./allroutes";


export default class Routes{

   
    constructor(app:Application){
        
        app.use('/api',allroutes)
    }
}