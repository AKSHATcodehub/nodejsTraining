import {Request, Response, Router} from 'express';
import { jwtAuthorisation, sessionManagement, validationMiddleware  } from '../middlewares/validation-middlewares';
import { loginSchema, signupSchema } from '../constants/validation-schema';
import { ChangePassword, GenerateOTP, Login, Logout, Signup, VerifyOTP } from '../controllers/auth/onboarding';
import { AddProduct, PlaceBid, ProductListing,  RemoveProduct, ViewProduct } from '../controllers/features/products';
import { AddAddress, EditAddress, EditUserDetails, ProductImage, ProfilePic } from '../controllers/features/user';
import { Multer, getBuffer } from '../utility/multer';


const router: Router = Router();

// Routes can be written in this way too
// router.route('/users').get((req:Request,res:Response)=>{
//     serverLogger.info("I M HERE")
// })

    // Onboarding 
   
    router.post('/login', validationMiddleware(loginSchema) ,Login); //done (bug when a new user signs up)

    router.post('/signup',validationMiddleware(signupSchema),Signup ); //done 

    router.get('/logout',jwtAuthorisation, sessionManagement, Logout ) //done

    router.post('/profile-picture',getBuffer.single('image'),jwtAuthorisation,sessionManagement,ProfilePic) //done

        //re claim credentials / Forgot Password

    router.post('/generate-otp',GenerateOTP) //done

    router.post('/verify-otp',VerifyOTP) //done

    router.post('/change-password',jwtAuthorisation,sessionManagement,ChangePassword)

    // User 

    router.post('/address',jwtAuthorisation,sessionManagement,AddAddress) //done

    router.patch('/address',jwtAuthorisation,sessionManagement, EditAddress) //done 

    router.patch('/user',jwtAuthorisation,sessionManagement, EditUserDetails ) //done

    // Feature

    router.post('/product',jwtAuthorisation,sessionManagement,AddProduct)  //done

    router.delete('/product',jwtAuthorisation,sessionManagement,RemoveProduct)   //done

    router.get('/product-details/:id',jwtAuthorisation,sessionManagement,ViewProduct); //done view the product through ID

    router.post('/product-image/:id',jwtAuthorisation,sessionManagement, Multer.single("image"),ProductImage) //done 

    router.post('/bid',jwtAuthorisation,sessionManagement,PlaceBid) //done

    router.get('/product-list',jwtAuthorisation,sessionManagement,ProductListing);  //done

export const apiRouter = router;