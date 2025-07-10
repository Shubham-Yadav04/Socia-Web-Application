import mongoose from 'mongoose'
import bcrypt from "bcryptjs"
const userSchema= new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    avatar:{
        type:String,
        required:true,
        
    },
  
   userPosts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post',

        }
    ],
    likedPosts:[
{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post'
}
    ],
    commentsList:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    password:{
        type:String,
        required:[true,'Password is required']
    },
    refreshToken:{
        type:String,
    },
    following:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            unique:true
        }
    ],
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            unique:true
        }
    ]
},{timestamps:true});


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Skip if password is unchanged
    try {
     
      this.password = await bcrypt.hash(this.password,12);
      next();
    } catch (error) {
      next(error);
    }
  });

  userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

export const userModel=mongoose.model('User',userSchema);