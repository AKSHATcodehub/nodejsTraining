import { Application } from "express";
import sumController from "../controllers/sum.controller";
import allroutes from "./allroutes";


export default class Routes{

   
    constructor(app:Application){
        /**
         * @openapi
         * /sum
         *  get:
         *      tag:
         *          - sum of two number
         *          description:Responds if the app is up iouytrewand running
         *          responses:
         *              200:
         *                  description:App is running
         */
        app.get("/sum",sumController.getSumData)
        app.use('/api',allroutes)
    }
}