import mongoose from "mongoose";

export const commentSchema=  new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    text:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

export const commentModel = mongoose.model('Comment',commentSchema)