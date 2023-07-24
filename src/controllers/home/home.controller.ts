import { Request, Response } from "express";
import { postModel } from "../posts/post.model"


class HomeController{

    constructor(){}

    async getHomeData(req:Request,res:Response){
        try{
            const homeData = await postModel.find({post_id:1})
            
            res.send(homeData)

        }catch(err){
            console.log(err)
        }
    }
}

export const homeController = new HomeController();