import express from "express";
import mongoose from "mongoose";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import 'reflect-metadata';
import { Application } from "express";
import Server from "./src/index";
import { authRoute } from "./src/routes/auth.route";

const app:Application=express();
app.use(express.json())
const server:Server = new Server(app)

mongoose.connect("mongodb+srv://akshatsahu7377:akshat@cluster0.6dyf39c.mongodb.net/instagram", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
    }).then(()=>{
        console.log("database connected successfully")
    }).catch((err)=>{
        console.log(err)
    })

    app.use('/login',(req,res)=>{
        res.send("hhu")
    })


app.listen(3000,()=>{
    const options = {
        definition: {
          openapi: "3.1.0",
          info: {
            title: "LogRocket Express API with Swagger",
            version: "0.1.0",
            description:
              "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
              name: "MIT",
              url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
              name: "LogRocket",
              url: "https://logrocket.com",
              email: "info@email.com",
            },
          },
          servers: [
            {
              url: "http://localhost:3000",
            },
          ],
        },
        apis: ["./src/routes/auth.route.ts"],
      };
      
      const specs = swaggerJsdoc(options);
      app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs)
      );
    console.log("server are running on port 3000")


})

