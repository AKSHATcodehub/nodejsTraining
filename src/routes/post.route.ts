import { Router } from "express";
import { postClass } from "../controllers/posts/post.controller";
import { verifyUser } from "../middleware/userauth.middleware";
import swaggerJSDoc from "swagger-jsdoc";
import  swaggerUi  from 'swagger-ui-express';

class PostRoute{
    router = Router()
    constructor(){
        this.intializeRoutes()
    }

    intializeRoutes(){
        this.router.get('/post',verifyUser,postClass.getAllPost);
        this.router.post('/post',postClass.createPost);
        this.router.put('/post:id',postClass.createPost);
        this.router.delete('/post:id',postClass.createPost)
    }
}

export const postRoute = new PostRoute().router;