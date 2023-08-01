import Joi, { isSchema } from 'joi'; 
import { NextFunction, Request, Response } from "express";
import { serverLogger } from '../utility/serverLogger';
import jwt from "jsonwebtoken";
import { SessionModel } from '../db/models';

export const validationMiddleware =  (schema:any) => { 
  
    return async(req:Request, res:Response, next:NextFunction) => {
        try{
            await schema.validateAsync(req.body);
            next()
        }catch(e){
            res.send(e);
        }
  } 
} 


export const jwtAuthorisation = (req:Request, res:Response, next:NextFunction)=>{
    try{
        let token:any;
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            token = req.headers.authorization.split(' ')[1];
            const tokenData = jwt.verify(token,'akshat')
            req.body.tokenData = tokenData;
            next();
        }else{
            res.status(401).send("UNAUTHORISED ACCESS")
        }
        
    }catch(e:any){
        res.status(401).send("UNAUTHORISED ACCESS")
    }    
}


export const sessionManagement = async(req:Request, res:Response, next:NextFunction)=>{
    
    
    try{
        const {tokenData} = req.body;
        let sessionDetails = await SessionModel.findOne({
            where:{session_id:tokenData.session_id, user_id:tokenData.user_id}
        })    
        
        // console.log(tokenData,sessionDetails,"----------------SD-----------");
                
        if(sessionDetails){
            next()
        }else{
            res.status(401).send("Authorisation Error")
        }

    }catch(e){
        res.send(e);
    }
    
    

}