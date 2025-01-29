 const mongoose = require('mongoose');
 let isConnected=false;

export const connectToDatabase= async()=>{
    if(isConnected){
        console.log("Database is already connected")
        return;
    }
    try{
     const connection=await mongoose.connect(process.env.MONGODB_URI,{
       dbName:"CotEventsDatabase",
       bufferCommands:false,
       
     })
     isConnected = true;
     console.log("Database is connected")
     return connection;

    }catch(err){
        console.log("Failed to connect to database",err)
    }
 }