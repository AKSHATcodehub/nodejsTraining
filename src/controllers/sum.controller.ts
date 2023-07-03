import { NextFunction, Request, Response } from "express"
import { apiErrorHandler } from "../handler/errorhandler";

class SumController{

    constructor(){}

    getSumData(req:Request,res:Response,next:NextFunction){
        try{
            let sum = req.body.num1 + req.body.num2
            res.send(`Sum of ${req.body.num1} and ${req.body.num2} is ${sum}`)

        }catch(error){
            apiErrorHandler(error,req,res,'Fetch dashboard data failed.');
           
        }
    }
}

export default new SumController();

