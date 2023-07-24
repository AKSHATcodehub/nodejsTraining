import { Request, Response } from "express";
import { userService } from "./user.service";


class UserController{

    constructor(){}

    async getUser(req:Request,res:Response){
        await userService.getUsers(req,res)
    }

    async createUser(req:Request,res:Response){
        await userService.createUser(req,res)
    }

    async updateUser(req:Request,res:Response){
        userService.updateUser(req, res)
    }
}

export const userController = new UserController();