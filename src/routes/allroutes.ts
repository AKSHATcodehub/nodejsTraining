import divideController from "../controllers/divide.controller";
import logController from "../controllers/log.controller";
import modulusController from "../controllers/modulus.controller";
import multiplyController from "../controllers/multiply.controller";
import squareRootController from "../controllers/square-root.controller";
import subtractionController from "../controllers/subtraction.controller";
import sumController from "../controllers/sum.controller";
import { Router } from "express";


class AllRoutes{
    router = Router()
    constructor(){
        this.intializeRoutes()
    }
    intializeRoutes(){
        this.router.get('/sum',sumController.getSumData);
        this.router.get('/subtraction',subtractionController.getSubtractionData);
        this.router.get('/multiply',multiplyController.getMultiplyData);
        this.router.get('/divide',divideController.getDivideData);
        this.router.get('/modulus',modulusController.getModulusData);
        this.router.get('/square_root',squareRootController.getSquareRootData);
        this.router.get('/log',logController.getLogData);
    }

}

export default new AllRoutes().router;