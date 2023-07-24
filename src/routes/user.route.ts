import { Router } from 'express';
import { userController } from '../controllers/users/user.controller';

class UserRoute{
    router = Router()
    constructor(){
        this.intializeRoutes()
    }

    intializeRoutes(){
        this.router.get('/user',userController.getUser);
        this.router.post('/user',userController.createUser);
        this.router.put('/user',userController.updateUser);

    }
}

export const userRoutes = new UserRoute().router;