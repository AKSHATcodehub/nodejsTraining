import { NextFunction, Request, Response } from "express"
import { apiErrorHandler } from "../handler/errorhandler";

class SquareRootController{

    constructor(){}

    getSquareRootData(req:Request,res:Response,next:NextFunction){
        try{
            let square = req.body.num1 ** req.body.num2
            res.status(200).send(`Square Root of ${req.body.num1} and ${req.body.num2} is ${square}`)

        }catch(error){
            apiErrorHandler(error,req,res,'Fetch data failed.');
           
        }
    }
}

export default new SquareRootController();

