require("dotenv").config();
import { Sequelize, DataTypes } from "sequelize";
import { developmentConfig } from "../config";


let config:any = developmentConfig;
const sequelize = new Sequelize(config);

async function connectDB() {
  try {

    await sequelize.authenticate();
    console.log("✅ Connection has been established successfully.");
    await sequelize.sync();
    console.log("CONNECTION has been synced");
    
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export { connectDB, sequelize,  DataTypes };
