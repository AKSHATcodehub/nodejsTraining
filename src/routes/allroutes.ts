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
        this.router.post('/sum',sumController.getSumData);
        this.router.post('/subtraction',subtractionController.getSubtractionData);
        this.router.post('/multiply',multiplyController.getMultiplyData);
        this.router.post('/divide',divideController.getDivideData);
        this.router.post('/modulus',modulusController.getModulusData);
        this.router.post('/square_root',squareRootController.getSquareRootData);
        this.router.post('/log',logController.getLogData);
    }

}

export default new AllRoutes().router;