import { Application, json, urlencoded } from "express";
import cors from 'cors';
import winston from 'winston';
import Routes from "./routes/routes";
import { unCoughtErrorHandler } from "./handler/errorhandler";
import swaggerDocs from "../src/utils/swagger";

export default class Server{
    constructor(app:Application){
        this.config(app);
        new Routes(app);
    }

    config(app:Application):void{
        app.use(urlencoded({ extended: true }));
        app.use(json())
        app.use(cors());
        app.use(unCoughtErrorHandler)
    }
}

process.on("beforeExit", function (err) {
    winston.error(JSON.stringify(err));
    console.error(err);
  });  