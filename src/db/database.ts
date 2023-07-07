import mongoose from "mongoose";

// const { MONGO_URI } = process.env;

const MONGO_URI = "mongodb+srv://akshatsahu7377:akshat@cluster0.ckc0prv.mongodb.net/node_training"

export const connect = () => {
  // Connecting to the database
  mongoose.connect("mongodb+srv://akshatsahu7377:akshat@cluster0.6dyf39c.mongodb.net/node_training", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error:any) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};