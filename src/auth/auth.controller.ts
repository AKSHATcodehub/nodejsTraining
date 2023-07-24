import { NextFunction, Request, Response } from "express";
import { sessionModel, userModel } from "../controllers/users/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createClient } from "redis";

// const client = createClient();

// client.on("error", (err) => console.log("Redis Client Error", err));

class AuthController {
    constructor(){}

    async loginUser(req:Request,res:Response,next:NextFunction){
        try{
            const {user_id,email,password} = await userModel.findOne({email:req.body.email})
            
            const isValidPassword = await bcrypt.compare(req.body.password,password)
            
            if(isValidPassword){
                
                console.log(">>>>>>>>>>>>",user_id)
                const token =  jwt.sign({user_id:user_id},"akshat")

                // let payload = {
                //     id:req.body._id
                // }

                let session_payload:any={
                    user_id:user_id,
                    device_id:"1234",
                    device_type:"google chrome"
                }

                await sessionModel.insertMany([
                    session_payload
                ])

                // let result = await client.set(`${req.body._id}_session`,JSON.stringify(session_payload))

                return res.send({message:"User Login Succesfully",token:token})


            }else{
                return res.send({message:"Invalid Credential"})
            }

        }catch(err){
            res.send({message:err})
        }

    }

    async signupUser(req:Request,res:Response,next:NextFunction){

        try{
            let {user_id,email,password,profile} = req.body;

            password = await bcrypt.hash(password,10)

            const user = await userModel.create({user_id,email,password,profile})
    
            await user.save()
    
            res.send({message:"User created sucessfully"})

        }catch(err){
            return res.send(err)
        }

    }
}

export const authController = new AuthController();