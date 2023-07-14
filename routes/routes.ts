import { Application } from "express";
import { Login, RegisterUser } from "../controllers/onboarding";
import { verifyToken } from "../middlewares/authorisation";
import { CreateChat, DeleteChat, FetchChat, SendChat } from "../controllers/chat-controllers";

export default function routes(app:Application){


    app.post('/login',Login)
    
    app.post("/register", RegisterUser);

    app.get("/chats", verifyToken, FetchChat)

    app.post("/send-message",verifyToken ,SendChat);

    app.post("/create-chat",verifyToken,CreateChat);

    app.delete("/rooms",verifyToken,DeleteChat)

}