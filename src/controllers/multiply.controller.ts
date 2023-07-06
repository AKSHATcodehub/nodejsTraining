import { NextFunction, Request, Response } from "express"
import { apiErrorHandler } from "../handler/errorhandler";

class MultiplyController{

    constructor(){}

    getMultiplyData(req:Request,res:Response,next:NextFunction){
        try{
            if(req.body.num1 && req.body.num2){
                let product =  Number(req.body.num1) *  Number(req.body.num2)
                res.status(200).send(`Product of ${req.body.num1} and ${req.body.num2} is ${product}`)
            }else{
                res.status(400).send({message:"Invalid Payload"})
            }

        }catch(error){
            apiErrorHandler(error,req,res,'Fetch data failed.');
           
        }
    }
}

export default new MultiplyController();

