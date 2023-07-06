import { NextFunction, Request, Response } from "express"
import { apiErrorHandler } from "../handler/errorhandler";

class MultiplyController{

    constructor(){}

    getMultiplyData(req:Request,res:Response,next:NextFunction){
        try{
            let product = req.body.num1 * req.body.num2
            res.status(200).send(`Product of ${req.body.num1} and ${req.body.num2} is ${product}`)
        

        }catch(error){
            apiErrorHandler(error,req,res,'Fetch data failed.');
           
        }
    }
}

export default new MultiplyController();

