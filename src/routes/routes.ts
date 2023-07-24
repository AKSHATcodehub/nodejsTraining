import { Application } from "express";
import { commentRoutes } from "./comment.route";
import { userRoutes } from "./user.route";
import { authRoute } from "./auth.route";
import { postRoute } from "./post.route";
import { homeRoute } from "./home.route";
import { likeRoutes } from "./like.route";

export default class Routes{
    constructor(app:Application){
      
        app.use('/api',commentRoutes);
        app.use('/api',postRoute)
        app.use('/api',userRoutes)
        app.use('/api',authRoute)
        app.use('/api',homeRoute)
        app.use('/api',likeRoutes)
    }
}