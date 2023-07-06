import { NextFunction, Request, Response } from "express"
import { apiErrorHandler } from "../handler/errorhandler";

class DivideController{

    constructor(){}

    getDivideData(req:Request,res:Response,next:NextFunction){
        try{
            let divide = req.body.num2 / req.body.num1
            res.status(200).send(`Divison of ${req.body.num1} and ${req.body.num2} is ${divide}`)

        }catch(error){
            apiErrorHandler(error,req,res,'Fetch data failed.');
           
        }
    }
}

export default new DivideController();

