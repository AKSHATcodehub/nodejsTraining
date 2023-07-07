import { NextFunction, Request, Response } from "express";
import { apiErrorHandler } from "../handler/errorhandler";
import UserModel, {validateRegisterUserInput,validateLoginUserInput} from "../db/models/user.model";
import { connect } from "../db/database";
import jwt from "jsonwebtoken";
import {ACCOUNT , LOGIN} from '../constants/message.constants';
import dotenv from "dotenv";
dotenv.config();

class AuthController {
  constructor() {
    connect();
  }

  async register(req: Request, res: Response, next: NextFunction) {
    // Our register logic starts here
    try {
      //validate register user Input

      let isValidate = validateRegisterUserInput(req.body);

      console.log(isValidate);

      if (isValidate.error) {
        return res.send(isValidate.error);
      }
      // Get user input

      const { first_name, last_name, email, password } = req.body;

      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await UserModel.findOne({ email });

      if (oldUser) {
        return res.status(409).send({message:"User Already Exist. Please Login"});
      }

      //Encrypt user password
      //encryptedPassword = await bcrypt.hash(password, 10);

      // Create user in our database
      const user: any = await UserModel.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password,
      });

      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY as any,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;

      // return new user
      res.status(201).json({message:ACCOUNT.CREATED,user});
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  }

  async login(req: Request, res: Response, next: NextFunction) {
    // Our login logic starts here
    try {
      //validate login Inputs

      let isValidate = validateLoginUserInput(req.body);

      if (isValidate.error) {
        return res.send(isValidate.error);
      }

      // Get user input
      const { email, password } = req.body;

      // Validate if user exist in our database
      const user = await UserModel.findOne({ email });

      //   if (user && (await bcrypt.compare(password, user.password))) {
      if (user && user.password === password) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY as any,
          {
            expiresIn: "2h",
          }
        );

        // save user token
        user.token = token;

        // user
        res.status(200).json(user);
      }
      res.status(400).send({message:LOGIN.FAILED});
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  }
}

export default new AuthController();
