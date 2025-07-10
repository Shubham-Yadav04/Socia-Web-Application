 // routes related to posts 

 import {Router} from "express"
import { deletePost, getPost, getPostComments, updateCaption, uploadPost,postLikes,getPostShares, likePost, commetOnPost, sharePost } from "../controllers/post.controller.js"
import { loginCheckerMiddleware } from "../Middlewares/loginChecker.middleware.js"

 export const postRoutes= Router()

//   get routes 

postRoutes.get('/:postId',getPost)
postRoutes.get('/likes/:postId', postLikes)
postRoutes.get("/share/:postId", getPostShares)
postRoutes.get("/comment/:postId", getPostComments)


//  post utility routes 

postRoutes.put('like/:postId',likePost)
postRoutes.put('comment/:postId',commetOnPost)
postRoutes.put('share/:postId',sharePost)


//  post Routes 
postRoutes.use(loginCheckerMiddleware)

//  post Modification related routes
postRoutes.post('/upload',uploadPost)
//  put Route
postRoutes.put('/caption/:postId',updateCaption)
//  delete route
postRoutes.delete('delete/:postId',deletePost)
