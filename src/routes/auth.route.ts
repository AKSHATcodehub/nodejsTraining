import { Router } from "express"
import { authController } from "../auth/auth.controller"
// import { verifyUser } from "../middleware/userauth.middleware"

class AuthRoute{

    router = Router()

    constructor(){
        this.intializeRoutes()
    }

    intializeRoutes(){

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         finished:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */
        this.router.post("/login",authController.loginUser)
        this.router.post("/signup",authController.signupUser)
    }
}

export const authRoute = new AuthRoute().router;



