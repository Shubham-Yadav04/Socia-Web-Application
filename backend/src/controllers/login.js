import { userModel } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import 'dotenv/config'

// abhi tak agr user login krta h to usko ek refresh token and ek access token assign ho jayega uski cookie m using which he can pass the authorization  for a short period of time of 1 day

export const loginChecker = async (req, res) => {

    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({
        "message": "Enter Username and Password"
    })

    // now we have both the username as well as the password we have to check the authentication of the user
    const user = await userModel.findOne({
        "username": username
    }, {
        "username": 1,
        "password": 1
    })

    if (!user) return res.status(404).json({
        "message": "NO such user exists"
    })

    // now we have the user and details so we have to compare the password using the compare method of the bcrypt

    const result = bcrypt.compareSync(password, user.password)
    if (result) {

        // means the user is authorized now we will  generate a jwt token for the user 
        const accessToken = jwt.sign({
            "username": user.username,
        },
            process.env.ACCESS_TOKEN_SECRET_KEY,
            {
                expiresIn: 24 * 60 * 60,
            }
        )
        const refreshToken = jwt.sign({
            "username": user.username,
        },
            process.env.REFRESH_TOKEN_SECRET_KEY,
            {
                expiresIn: 7 * 24 * 60 * 60,
            }
        )

        res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('jwtRefreshToken', refreshToken, { httpOnly: true, maxAge: 7*24 * 60 * 60 * 1000 });

        try {
            const refershTokenAddition = await userModel.updateOne({ "username": username }, {
                '$set': {
                    "refreshToken": refreshToken
                }
            })

        }
        catch (error) {
            console.log("there is some error occured while adding the refersh token for the user in database ")
        }
        return res.status(200).json({ "message": "sign in successfully" })
    }
    return res.status(402).send("wrong username and password ")
}