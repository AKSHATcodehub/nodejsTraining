import mongoose from "mongoose";
import Joi from 'joi';
const userSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

let userRegisterInputValidation = Joi.object({
  first_name: Joi.string().min(5).max(100).required(),
  last_name: Joi.string().min(5).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.required()
})

let userLoginInputValidation = Joi.object({
  email:Joi.string().email().required(),
  password:Joi.required(),
})

export function validateRegisterUserInput(data:any){
  return userRegisterInputValidation.validate(data)
}

export function validateLoginUserInput(data:any){
  return userLoginInputValidation.validate(data)
}

const UserModel = mongoose.model("user", userSchema);

export default UserModel;

