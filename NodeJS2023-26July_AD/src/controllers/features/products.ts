import { Request, Response } from "express";
import { AddressModel, ProductModel } from "../../db/models";
import { loggerMiddleWare } from "../../middlewares/logger";
import { Multer } from "../../utility/multer";
import { log } from "winston";

import { Op } from "sequelize";

export const AddProduct = async (req: Request, res: Response) => {

    try {

        const { tokenData, product_name, description, base_price, category_id, subcategory_id, address_id } = req.body;

        let productDetails = await ProductModel.create({
            user_id: tokenData.user_id,
            product_name: product_name,
            description: description,
            base_price: base_price,
            category_id: category_id,
            address_id: address_id,
            subcategory_id: subcategory_id
        })



        res.send(productDetails);
    } catch (e) {

        res.send(e)
    }

}

export const ViewProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        let productDetails = await ProductModel.findOne({
            where: {
                product_id: id
            }
        })
        res.status(200).send(productDetails)
    } catch (e) {
        res.status(404).send("NOT FOUND")
    }
}



export const PlaceBid = async (req: Request, res: Response) => { //edge case of same user putting bid needs to be solved
    try {

        const { bid_amount, product_id, tokenData } = req.body;

        await ProductModel.increment(
            'current_price',
            {
                by: bid_amount,
                where: { product_id: product_id }
            }
        )
        await ProductModel.update(
            {
                bidder_id: tokenData.user_id
            },
            {
                where: { product_id: product_id }
            }
        )

        res.status(200).send("UPDATION SUCCESFULL")

    } catch (e) {
        res.status(400).send(e)
    }
}


export const ProductListing = async (req: Request, res: Response) => {

    try {
        const { category, subcategory,order } = req.query;

        let querryArray = [];
        let orderArray:any = []
        
        if(category){
            querryArray.push({category_id:category})
        }

        if(subcategory){
            querryArray.push({subcategory_id:subcategory})
        }
        
        if(order){
            orderArray.push([order])
            let productListing = await ProductModel.findAll({
                where:{
                    [Op.and] : querryArray
                },
                order:orderArray
            })
            res.send(productListing)
        }else{
            let productListing = await ProductModel.findAll({
                where:{
                    [Op.and] : querryArray
                },
                order:orderArray
            })

            res.send(productListing)
        }

    } catch (e) {
        res.send(e);

    }
}

export const RemoveProduct = async(req:Request, res:Response)=>{

    try{
        let {id} = req.params;
        await ProductModel.destroy({
            where: {product_id: id}
        })
        res.send('succesfully deleted product')

    }catch(e){
        res.send('server ereror')
    }

}

