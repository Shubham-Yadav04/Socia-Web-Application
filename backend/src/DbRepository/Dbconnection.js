// going to write the function to connect the mongoDb database with the application
import mongoose from 'mongoose'
import 'dotenv/config'
export const connectDB= async() =>{
    try{
        console.log(`${process.env.MONGO_URL}`)
        const connectionInstance =await mongoose.connect(`${process.env.MONGO_URL}${process.env.DATABASE_NAME}`)
        console.log("the database is connected at ",connectionInstance.connection.host)

    
    }
    catch(error){
        console.log("something has occured while connecting the database " ,error)
    }
}