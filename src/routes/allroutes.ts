
import { Router } from "express";
import authController from "../controllers/auth.controller";

class AllRoutes{
    router = Router()
    constructor(){
        this.intializeRoutes()
    }
    intializeRoutes(){
        /**
         * @openapi
         * /sum
         *  get:
         *      tag:
         *          - sum of two number
         *          description:Responds if the app is up and running
         *          responses:
         *              200:
         *                  description:App is running
         */
        this.router.post("/register",authController.register);
        this.router.post("/login",authController.login);

    }

}

export default new AllRoutes().router;