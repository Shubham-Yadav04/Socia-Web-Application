// used to refresh the access token if the user contains a valid refresh token 
import jwt from 'jsonwebtoken'
import 'dotenv/config'
export const refreshAccessToken = async (req,res) =>{
    const refreshToken= req.cookies.jwtRefreshToken

    if(!refreshToken) return  res.json({
        message: "Please Login Again "
    })
    try{
     const decoded =jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY)
     if(decoded) {
        const generatedAccessToken= jwt.sign({
            username:decoded.username
            
        }, process.env.ACCESS_TOKEN_SECRET_KEY,
        {
            expiresIn: 24 * 60 * 60,
        }
    )
    res.cookie('jwt',generatedAccessToken ,{ httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })

     return res.status(200).json({
        message:"token refreshed "
     })
     }
     
    }
    catch(err){
        console.log(err)
return res.json({message:"some error occurred while refreshing the token"})
    }

}