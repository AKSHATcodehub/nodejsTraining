
import { Application } from "express";
import allroutes from "./allroutes";


export default class Routes{

   
    constructor(app:Application){
        
        app.use('/api',allroutes)
    }
}