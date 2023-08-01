import jwt from "jsonwebtoken"
import { SessionModel } from "../db/models";

export const generateJWT=async (userData:any)=>{
    
    try{
        const newSessionData:any = await SessionModel.create({ user_id: userData.user_id });
        let jwtObj = {
            session_id: newSessionData.dataValues.session_id,
            user_id:newSessionData.dataValues.user_id
        }
        let token = jwt.sign(jwtObj,'akshat',{expiresIn:'2h'})

        return token;

    }catch(e){
        return e;        
    }
    
}