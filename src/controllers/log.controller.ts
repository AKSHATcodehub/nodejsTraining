import { NextFunction, Request, Response } from "express"
import { apiErrorHandler } from "../handler/errorhandler";

class LogController{

    constructor(){}

    getLogData(req:Request,res:Response,next:NextFunction){
        try{
            if(req.body.num1 && req.body.num2){
                let log = Math.log( Number(req.body.num1))
                res.status(200).send(`Log of ${req.body.num1} is ${log}`)
            }else{
                res.status(400).send({message:"Invalid Payload"})
            }

        }catch(error){
            apiErrorHandler(error,req,res,'Fetch data failed.');
           
        }
    }
}

export default new LogController();

