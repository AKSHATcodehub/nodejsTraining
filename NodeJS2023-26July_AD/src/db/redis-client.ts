import { func } from 'joi';
import { createClient } from 'redis';

export const redisClient = createClient();

// (async function (){

//     client.on('error', err => console.log('Redis Client Error', err));
//     await client.connect();

// })()

export const redisConnect = async()=>{
    redisClient.on('error', err => console.log('Redis Client Error', err));
    await redisClient.connect();
    console.log("REDIS CONNECTED");
    
}