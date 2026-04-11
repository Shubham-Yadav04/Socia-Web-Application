import { Router } from "express";
import { upload } from "../Middlewares/multer.middleware.js";
import { loginChecker } from "../controllers/login.js";
import { changeEmail, changePassword, deleteUserAccount, followUser, getAllPosts, getUserByEmail, getUserById, getUserByUsername, getUserFollowers, getUserFollowings, registerUser, updateAvatar, updateDetails,getAllUsers, getLoggedInUser,getRandomUserSuggestions } from "../controllers/user.controller.js";
import { loginCheckerMiddleware } from "../Middlewares/loginChecker.middleware.js";
import { refreshAccessToken } from "../utils/refreshAccessToken.js";
import { Logout } from "../controllers/logOut.js";
import { unfollowUser_UpdateFollowing } from "../controllers/user.controller.js";
const routes = Router()

// get user by using username ,id ,or email
routes.get('/username/:username', getUserByUsername);
routes.get('/email/:email', getUserByEmail)
routes.get('/id/:id', getUserById)
routes.get("/",getAllUsers);
//  get all user post using username ,email , or id

routes.get('/posts/:id', getAllPosts)
routes.post('/follow/:userId',followUser)
//  followings routes

routes.get('/followings/:id', getUserFollowings)
routes.post('/unfollow/:userId',unfollowUser_UpdateFollowing)


//  followers Routes 

routes.get('/followers/:id', getUserFollowers)
// POST request 
routes.post('/register', upload.single('avatar'), registerUser)
routes.post('/login', loginChecker)

routes.get("/refreshToken", refreshAccessToken)
// applying middleware which is going to act as a login checker for the put and delete operation 
routes.use(loginCheckerMiddleware)
routes.get('/loggedInUser',getLoggedInUser)
routes.get('/logout', Logout)
routes.get('/suggestions',getRandomUserSuggestions)

// PUT request  

routes.put('/updateDetail', updateDetails)
routes.put('/avatar', upload.single('avatar'), updateAvatar)
routes.put('/email', changeEmail)
routes.put('/password', changePassword)

//  delete Routes

routes.delete('/delete', deleteUserAccount)
export default routes