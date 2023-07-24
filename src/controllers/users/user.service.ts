import { Request, Response } from "express"
import { userModel } from "./user.model"

export class UserService{
    constructor(){}
    
    async getUsers(req:Request,res:Response){
        const user = await userModel.find({})
        res.send(user)
    }

    async createUser(req:Request,res:Response){
        const {user_id,email,password,profile}= req.body;
        const user = await userModel.create({
            user_id,email,password,profile
        })
        user.save()

        res.send({message:"User created sucessfully"})
    }

    updateUser(req:Request,res:Response){
        
    }
}

export const userService = new UserService()




