import { NextFunction, Request, Response } from "express"
import { apiErrorHandler } from "../handler/errorhandler";

class SubtractionController{

    constructor(){}

    getSubtractionData(req:Request,res:Response,next:NextFunction){
        try{
            let sub = req.body.num1 - req.body.num2
            res.status(200).send(`Subtraction of ${req.body.num1} and ${req.body.num2} is ${sub}`)

        }catch(error){
            apiErrorHandler(error,req,res,'Fetch data failed.');
           
        }
    }
}

export default new SubtractionController();

