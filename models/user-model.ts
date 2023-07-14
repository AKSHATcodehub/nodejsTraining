// import { sequelize, DataTypes } from 

import { DataTypes, sequelize } from "../database/db";


export const UserModel = sequelize.define("users", {
    id: {
         type:DataTypes.INTEGER,    
         primaryKey: true,
         autoIncrement:true
        },
        username: DataTypes.TEXT,
        email: DataTypes.TEXT,
        password: DataTypes.TEXT,
      }, {
            timestamps: false
        }
);

export const RoomModel= sequelize.define("rooms", {
  
  room_id: {
    type:DataTypes.TEXT,
    primaryKey:true
  },
  participant_1:DataTypes.INTEGER,
  participant_2:DataTypes.INTEGER
}, {timestamps:false})

export const MessagesModel = sequelize.define("messages",{
  id: {
    type:DataTypes.INTEGER,    
    primaryKey: true,
    autoIncrement:true
   },
  room_id:DataTypes.TEXT,
  message_content:DataTypes.TEXT,
  sender_id:DataTypes.INTEGER

}, {timestamps:false})