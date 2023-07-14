import { Request, Response } from "express";
import { sequelize } from "../database/db";
import { MessagesModel, RoomModel, UserModel } from "../models/user-model";



export const SendChat = async (req: Request, res: Response) => {

    try {
        const { to_email, from_email, message_content } = req.body;
        let to_data = await UserModel.findOne({ where: { email: to_email } }); // get the to_user from db

        let from_data = await UserModel.findOne({ where: { email: from_email } }) // get the from_data db

        let [room_data, other_data] = await sequelize.query(`SELECT room_id FROM rooms WHERE participant_1='${to_data?.dataValues.id}' AND participant_2='${from_data?.dataValues.id}' OR participant_1='${from_data?.dataValues.id}' AND participant_2='${to_data?.dataValues.id}' `)
        //@ts-ignore
        let room_id = room_data[0].room_id
        console.log(room_id);

        let messageObj = {
            sender_id: from_data?.dataValues.id,
            message_content: message_content,
            room_id: room_id
        }

        await MessagesModel.create(messageObj)
        res.status(200).send("message sucessfully sent")
    } catch (e) {
        res.status(400).send(e);
    }
}

export const CreateChat = async (req: Request, res: Response) => {

    try {

        const { participant_1, participant_2 } = req.body;
        let participant_1_data = await UserModel.findOne({ where: { email: participant_1 } }); // get the to_user from db
        let participant_2_data = await UserModel.findOne({ where: { email: participant_2 } }) // get the from_data db

        let [room_data, other_data] = await sequelize.query(`SELECT room_id FROM rooms WHERE participant_1='${participant_1_data?.dataValues.id}' AND participant_2='${participant_2_data?.dataValues.id}' OR participant_1='${participant_2_data?.dataValues.id}' AND participant_2='${participant_1_data?.dataValues.id}' `)
        
        // @ts-ignore
        if(room_data.length >0){
        // @ts-ignore
            res.status(200).send({chat_room_code:room_data[0].room_id})
        }else{
            let newRoomID = `B${participant_1_data?.dataValues.id}${participant_2_data?.dataValues.id}`
            let newRoomObj = {
                participant_1:participant_1_data?.dataValues.id, 
                participant_2:participant_2_data?.dataValues.id,
                room_id:newRoomID
            }
            console.log(newRoomObj,'NRO');
            
            await RoomModel.create(newRoomObj)
            res.status(200).send(`${newRoomID} has been created for the participants ${participant_1} and ${participant_2}`)
        }
        


    } catch (e) {
        res.status(404).send(e);
    }

}

export const DeleteChat = async(req:Request, res:Response)=>{

    try{
        const {room_id} = req.query;
        
        let deleteData = await MessagesModel.destroy({
            where: {
                room_id:room_id
            }
        })
        
        res.status(200).send("OK DELETED")
    }catch(e:any){
        
        res.status(400).send(e)
    }
}

export const FetchChat = async (req: Request, res: Response) => {

    try{
        const { page, size } = req.query;
        const { limit, offset } = getPagination(Number(page), Number(size));

        let messages = await MessagesModel.findAndCountAll({limit,offset})
        res.status(200).send(messages)
    }catch(e){
        console.log(e,"eeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
        res.status(400).send(e);

    }
}


const getPagination = (page:any, size:Number) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };