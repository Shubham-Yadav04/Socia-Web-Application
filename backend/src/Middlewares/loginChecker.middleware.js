import jwt from 'jsonwebtoken'
import { userModel } from '../models/user.model.js'


export const loginCheckerMiddleware= async (req,res,next)=>{
    const token=req.cookies.jwt
    if(token){
    try{
 const decoded =jwt.verify(token , process.env.ACCESS_TOKEN_SECRET_KEY)
console.log("we have checked in the middleware ye shi banda hai")

const user = await userModel.findOne({
    username: decoded.username
})

req.user=user
    return next()
    }
   catch(error){

       return res.status(403).send("unauthorized")
   }
}
return res.status(403).send('unauthorized')
}