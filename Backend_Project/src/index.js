// require ('dotenv').config({path: './env'}) //we need to configure dotenv ASAP. But imoporting the dotenv like this hapers the consistency of the code

import dotenv from 'dotenv'
import connectDB from './db/index.js';

dotenv.config({
    path: './env'
})


connectDB()




//This is also a way to connect db efficiently
/*import express from 'express';
const app = express()

//Database is always in a different continent, hence, connection with database takes time. So we should always include async await to connect with the databse
(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on('error', (error)=>{
            console.log("Error: ", error);
            throw error            
        })
        app.listen(process.env.PORT, ()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
            
        })
    } catch (error) {
        console.log("ERROR");
        
    }
})()  //approach of IIFI */