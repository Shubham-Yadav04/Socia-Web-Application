import { Router } from "express";
import { upload } from "../Middlewares/multer.middleware.js";
import { loginChecker } from "../controllers/login.js";
import { changeEmail, changePassword, deleteUserAccount, followUser, getAllPosts, getUserByEmail, getUserById, getUserByUsername, getUserFollowers, getUserFollowings, registerUser, updateAvatar, updateUsername } from "../controllers/user.controller.js";
import { loginCheckerMiddleware } from "../Middlewares/loginChecker.middleware.js";
import { refreshAccessToken } from "../utils/refreshAccessToken.js";
import { Logout } from "../controllers/logOut.js";
const routes = Router()

// get user by using username ,id ,or email
routes.get('/username/:username', getUserByUsername);
routes.get('/email/:email', getUserByEmail)
routes.get('/id/:id', getUserById)

//  get all user post using username ,email , or id
routes.get('/posts/:username', getAllPosts)
routes.get('/posts/:id', getAllPosts)
routes.get('/posts/:email', getAllPosts)


routes.put('follow/:userId',followUser)
//  followings routes
routes.get('/followings/:email', getUserFollowings)
routes.get('/followings/:username', getUserFollowings)
routes.get('/followings/:id', getUserFollowings)


//  followers Routes 
routes.get('/followers/:email', getUserFollowers)
routes.get('/followers/:username', getUserFollowers)
routes.get('/followers/:id', getUserFollowers)
// POST request 
routes.post('/register', upload.single('avatar'), registerUser)
routes.post('/login', loginChecker)

routes.get("/refreshToken", refreshAccessToken)
// applying middleware which is going to act as a login checker for the put and delete operation 
routes.use(loginCheckerMiddleware)
routes.get('/logout', Logout)

// PUT request  

routes.put('/username', updateUsername)
routes.put('/avatar', upload.single('avatar'), updateAvatar)
routes.put('/email', changeEmail)
routes.put('/password', changePassword)

//  delete Routes

routes.delete('/delete', deleteUserAccount)
export default routes