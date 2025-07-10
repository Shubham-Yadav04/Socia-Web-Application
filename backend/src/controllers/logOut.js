import { userModel } from "../models/user.model.js"

export const Logout= async (req , res)=>{
    //  i have to logout the user for that make the refresh token and the access token stored in cookie to be null and also reset the refresh token present in the database 

    res.clearCookie("jwt",{ httpOnly: true, secure: true });
    res.clearCookie("jwtRefreshToken",{ httpOnly: true, secure: true });

    // now we have to reset the refresh token of the user and also set the request user as null 
    if(req.user){
    try {
        const result= await userModel.updateOne({
            _id:req.user._id
        },{
            $set:{
                refreshToken:""
            }
        })

        if(result.modifiedCount>0) {
            return res.status(200).json({
            message:" Logged Successfully"
        })}
       
        return res.send("refresh Token not reseted ")
    } catch (error) {
        return res.status(500).json({
            message:"Some Internal server error occurred"
        })
    }
}
return res.send("already logged Out ")
}