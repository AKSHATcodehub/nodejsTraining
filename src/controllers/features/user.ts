import { Request, Response } from "express";
import { AddressModel, ProductImageModel, UserModel } from "../../db/models";
import fs from "fs";
import { log } from "winston";


export const AddAddress = async(req:Request, res:Response)=>{
    try{
        const {tokenData, house_number, street_number, area, landmark, city, state, zipcode, address_type } = req.body;
        let addressDetails = await AddressModel.create({
            user_id:tokenData.user_id,
            house_number:house_number,
            street_number:street_number,
            area:area,
            landmark:landmark,
            city:city,
            state:state,
            zipcode:zipcode,
            address_type:address_type
        })

        res.status(200).send(addressDetails);

    }catch(e){
        res.send(e);
    }
}

export const EditAddress = async(req:Request, res:Response)=>{
    let {tokenData} = req.body; 
    try{
        let update = await AddressModel.update(
            req.body,
            {
              where:{user_id:tokenData.user_id} 
            }
          )
          res.status(200).send("succesfully updated")
    }catch(e){
        res.status(400).send(e);
    }
}

export const EditUserDetails = async(req:Request, res:Response)=>{
    try{
        let {tokenData} = req.body;
        await UserModel.update(
            req.body,
            {
                where:{user_id:tokenData.user_id}
            }
        )
            res.send("SUCCESSFULLY data editted")
    }catch(e){
        res.send(e)
    }
}

export const ProfilePic = async(req:Request, res:Response)=>{
    try{
        if(req.file){
            console.log(req.file,'filedata');
            const {tokenData} = req.body
            try{
                
                await UserModel.update(
                    {
                        profile_pic:req.file.buffer
                    },
                    {
                        where:{user_id:tokenData.user_id}
                    }
                )
                res.send("Profile Updation succesfull")

            } catch(e){
                res.send("Serveer error")

            }
        }


    }catch(e){

    }

}

export const ProductImage = async(req:Request, res:Response)=>{

    const {id} = req.params;

    if(req.file){
        try{
            const fileData = fs.readFileSync(req.file.path);
            
            let productImage = await ProductImageModel.create({
                image_data:fileData,
                product_id: id,
            })

            res.send(productImage)
               
        }catch(e){

            res.send(e)
        }
    }
}

