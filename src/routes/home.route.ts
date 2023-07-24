import { Router } from "express"
import { homeController } from "../controllers/home/home.controller"

class HomeRoutes{

    router = Router()

    constructor(){
        this.intializeRoutes()
    }

    intializeRoutes(){
        this.router.get('/home',homeController.getHomeData)
    }

}

export const homeRoute = new HomeRoutes().router;