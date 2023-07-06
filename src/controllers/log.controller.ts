import { NextFunction, Request, Response } from "express"
import { apiErrorHandler } from "../handler/errorhandler";

class LogController{

    constructor(){}

    getLogData(req:Request,res:Response,next:NextFunction){
        try{
            let log = Math.log(req.body.num1)
            res.status(200).send(`Log of ${req.body.num1} is ${log}`)
        

        }catch(error){
            apiErrorHandler(error,req,res,'Fetch data failed.');
           
        }
    }
}

export default new LogController();

