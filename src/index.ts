import { Application } from "express";
import Routes from "./routes/routes"
import "reflect-metadata";

export default class Server{
    constructor(app:Application){
        new Routes(app)
    }

}