import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
import {UserModel} from "../models/user-model";
dotenv.config()

const key = 'ayush';

export const Login = async (req:Request,res:Response)=>{
   const { email, password} = req.body;

    let user_exist = await UserModel.findOne({where: {email:email, password:password}}); // checking does the user exist in db
    if(user_exist){
        const token = jwt.sign(
            { email:email },
            key,
            {
              expiresIn: "2h",
            });
            
            res.status(200).send({token:token});

    }else{
        res.status(404).send("user not found")
    }
       
}

export const RegisterUser = async(req:Request,res:Response) =>{
    try{
        const {email, password, username } = req.body;


        let user_exist = await UserModel.findOne({where: {email:email}}); // checking does the user exist in db
        if(!user_exist){
            UserModel.create({...req.body}).then((result:any)=>{

                console.log(result,"GOOD");
                res.status(201).send("User succesfully added") 
                
            }).catch((err:any)=>{
                console.log(err,"BAD");
                res.status(400).send("Something went wrong")
                
            })  
        }else{
            res.status(200).send("User already exists!")
        }        
        
    }catch(e:any){
        const {details} = e;
        res.send(details);
    }
}




