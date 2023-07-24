import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { createClient } from "redis";
import { sessionModel } from "../controllers/users/user.model";

interface CustomRequest extends Request{
    user_id:string
}

const client = createClient()

client.on("error", (err) => console.log("Redis Client Error", err));

export const verifyUser:any = async(req:CustomRequest,res:Response,next:NextFunction)=>{

    const verifyToken:any = jwt.verify(req.body.token,"akshat");

    if(verifyToken.user_id){

        req.user_id = verifyToken.user_id

        await client.connect()

        let findSession:any = await client.get(`${verifyToken.user_id}_session`) || await sessionModel.find(verifyToken.user_id)

        if(findSession.length!=0){
            next()
        }else{
            res.send("Session out")
        }


    }else{
        res.send({message:"invalid token"})
    }

}