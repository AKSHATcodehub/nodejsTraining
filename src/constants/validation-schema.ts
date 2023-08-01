// import Joi from "joi"
const Joi = require('joi').extend(require('@joi/date'));

export const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),
    password:Joi.string().min(5).max(30).required()
})

export const signupSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),
    password: Joi.string().token().min(5).max(30).required(),
    first_name: Joi.string().pattern(new RegExp('^[a-zA-Z]*$')).min(2).max(30).required(),
    last_name: Joi.string().pattern(new RegExp('^[a-zA-Z]*$')).min(2).max(30).required(),
    dob: Joi.date().format('YYYY-MM-DD').utc().required().less('2010-01-01'),
    gender: Joi.string().valid('M','F').required(), 
    mobile_number:Joi.string().required()
})

