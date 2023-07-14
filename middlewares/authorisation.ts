import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
const key = "ayush"

export const verifyToken = (req:Request, res:Response, next:any) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    // console.log(token,"MY TOKEN");
    
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, key);
      
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  
    
  
  };
