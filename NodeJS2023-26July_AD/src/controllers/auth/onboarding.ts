
import { Request, Response, NextFunction } from "express"
import { generateJWT } from "../../utility/create-token";
import { SessionModel, UserModel } from "../../db/models";
import nodemailer from "nodemailer";
import { redisClient } from "../../db/redis-client";



export const Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('req.body',req.body,'---------------------------------------');
        
        const { email, password } = req.body;
        let userData = await UserModel.findOne({
            where: {
                email: email,
                password: password
            },
            attributes: ['user_id']
        })
        console.log(userData,'UD');
        
        let jwtToken = await generateJWT(userData?.dataValues)

        res.status(200).send(jwtToken)
    } catch (e) {
        
        res.status(401).send("WRONG CREDENTIALS")
    }
}

export const Signup = async (req: Request, res: Response) => {
    try {
        let signedupUser = await UserModel.create(req.body)
        res.status(201).send(signedupUser)
    } catch (e) {
        res.status(400).send(e)
    }
}

export const GenerateOTP = async (req: Request, res: Response) => {
    try {
        const otp = Math.floor(1000 + Math.random() * 9000);
        const { to_email } = req.body;

        let config = {
            service: 'gmail',
            auth: {
                user: 'akshat@appinventiv.com',
                pass: 'wamatrcapmnozzcm'
            }
        }

        const transport = nodemailer.createTransport(config)
       
        let message = {
            from: 'akshat@appinventiv.com',
            to: to_email,
            subject: "Forget password OTP",
            html: `Your OTP is ${otp} and valid for 15 minutes`
        }

        transport.sendMail(message).then(()=>{
            redisClient.set(to_email,`${otp}`)
            res.send("Mail Send Successfully")

        }).catch((err)=>{
            res.send(err)
        })

    } catch (e) {
        res.send(e);
    }
}

export const VerifyOTP = async(req:Request, res:Response)=>{
    try{
        const {to_email, otp} = req.body;
        let db_otp = await redisClient.get(to_email);

        
        if(otp == db_otp){
            res.status(200).send("OTP verified")
        }else{
            res.status(400).send("incorrect OTP")
        }

    }catch(e){
        res.send(e)
    }
} 

export const ChangePassword = async(req:Request, res:Response)=>{
    try{
        const {tokenData, password} = req.body
       
        await UserModel.update(
            {
                password:password
            },
            {
                where:{user_id:tokenData.user_id}
            }
        )

        res.send('password sucessfully changed')            

    }catch(e){
        res.send(e)
    }

}




export const Logout = async (req: Request, res: Response) => {
    try {
        const { tokenData } = req.body;
        let deleted = await SessionModel.destroy({
            where: { user_id: tokenData.user_id, session_id: tokenData.session_id },
        });

        res.status(200).send("LOGGED OUT")
    } catch (e) {
        res.status(400).send(e)
    }
}