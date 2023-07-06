import { NextFunction, Request, Response } from "express"
import { apiErrorHandler } from "../handler/errorhandler";

class DivideController{

    constructor(){}

    getDivideData(req:Request,res:Response,next:NextFunction){
        try{
            if(req.body.num1 && req.body.num2){
                let divide =  Number(req.body.num2) /  Number(req.body.num1)
                res.status(200).send(`Divison of ${req.body.num1} and ${req.body.num2} is ${divide}`)
            }else{
                res.status(400).send({message:"Invalid Payload"})
            }
        }catch(error){
            apiErrorHandler(error,req,res,'Fetch data failed.');
           
        }
    }
}

export default new DivideController();

