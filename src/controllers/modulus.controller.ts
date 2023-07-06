import { NextFunction, Request, Response } from "express"
import { apiErrorHandler } from "../handler/errorhandler";

class ModulusController{

    constructor(){}

    getModulusData(req:Request,res:Response,next:NextFunction){
        try{
            let modulo = req.body.num2 % req.body.num1
            res.status(200).send(`Modulus of ${req.body.num1} and ${req.body.num2} is ${modulo}`)

        }catch(error){
            apiErrorHandler(error,req,res,'Fetch data failed.');
           
        }
    }
}

export default new ModulusController();

