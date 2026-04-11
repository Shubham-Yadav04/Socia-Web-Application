import jwt from 'jsonwebtoken'
import { userModel } from '../models/user.model.js'


export const loginCheckerMiddleware= async (req,res,next)=>{
 
    const token=req.cookies.jwt

    if(token){
    try{

 const decoded =jwt.verify(token , process.env.ACCESS_TOKEN_SECRET_KEY)


const user = await userModel.findOne({
    username: decoded.username
},{password:0,userPosts:0,likedPosts:0,commentsList:0})

req.user=user
    return next()
    }
   catch(error){
console.log(error.message);
       return res.status(403).send("unauthorized")
   }
}
return res.status(403).send('unauthorized')
}