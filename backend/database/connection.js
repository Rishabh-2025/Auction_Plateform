import mongoose from "mongoose";

export const connection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName :"MERN_Auction_Plateform"
    }).then(()=>{
        console.log("connected to database")
    }).catch((err)=>{
        console.log(`Some error occured whie connecting ${err} `)
    })
}