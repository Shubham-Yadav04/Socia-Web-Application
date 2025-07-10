//   going to write the posts controllers

import { mongoose } from "mongoose";
import { postModel } from "../models/post.model.js"
import { userModel } from "../models/user.model.js"
import { deleteFileFromCloudinary, uploadFileAsync } from "../utils/cloudinaryConfig.js"
import { commentModel } from "../models/comment.model.js";

// post route operations 
export const uploadPost = async (req, res) => {
    
    const textContent = req.body.textContent?.trim();
    const caption = req.body.caption?.trim() || null
    let media_url = req.file?.path || null;  
console.log(textContent , caption)
    if (!textContent && !media_url) {
        return res.status(400).send("You haven't provided any content to post.");
    }

    let cloudinaryUpload = null;
    if (media_url) {
        try {
            cloudinaryUpload = await uploadFileAsync(media_url);
            if (!cloudinaryUpload?.secure_url) {
                return res.status(500).send("Failed to upload media_url, please try again.");
            }
            
        } catch (uploadError) {
            console.error("Cloudinary upload failed:", uploadError);
            return res.status(500).send("Error uploading media.");
        }
    }

    try {
        const user = await userModel.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "No such user exists." });

        const result = await postModel.create({
            user: user._id,
            textContent,
            caption,
            media: [
                media_url?{
                    url: cloudinaryUpload.secure_url,
                    mediaType: cloudinaryUpload.resource_type,
                    public_id: cloudinaryUpload.public_id
                }:
                null
            ]
        });

        if (result) {
            const postAddedToUser = await userModel.updateOne(
                { _id:req.user._id },
                { $addToSet: { userPosts: result._id } }
            );

            if (postAddedToUser.modifiedCount > 0) {
                return res.status(201).send("Post created successfully.");
            }

            await postModel.deleteOne({ _id: result._id });
            return res.status(500).send("Post upload failed, please try again.");
        }
    } catch (error) {
        console.error("Error uploading post:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
// controller for  deleting the post or edit the captions 
export const deletePost= async (req,res,user)=>{
    // post ki id aayegi as a request param

    const password= req.body.password
    const postId= req.params.postId
    const user= req.user
    if(!postId) return res.status(400).json(
        {
            message: "Provide the Post ID to be deleted "
        }
    )
    if(!password) return res.status(400).json(
        {
            message: "Provide your password to delete post" // if it has the user in the request this means the user is loginned but we still checking that someone else is not having the physical access can do this thing 
        }
    )
// let postExists ;
//     try {
//        postExists= await postModel.findOne({
//             _id: postId
//         })

//         if(!postExists) return res.status(400).json({
//             message: " No Such Post exists"
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: "Internal Server Error "
//         }
//     )
//     }
    try {
        const isPasswordCorrect= req.user.comparePassword(password)
        if(!isPasswordCorrect)  return res.status(403).json({
            message:" Unauthorized "
        })

        // agr passowrd bhi correct h to we have to delete the post and if it has media in it then we have to delete the media form the cloudinary also
let deletPost ;
    try {
       deletePost= await postModel.deleteOne({
            _id: postId
        })

        if(deletePost.deleteCount>0) return res.status(400).json({
            message: " No Such Post exists"
        })
        const deletePostLinkedUser= await userModel.updateOne(
  { _id: user.id },
  { $pull: { posts: postId } }
 
);
 if(deletePostLinkedUser.modifiedCount>0) return res.status(200).json({
    message:"Success"
  })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error "
        }
    )
    }
        deleteFileFromCloudinary(postExists.public_id);

        return res.status(200).json({
            message:" post deleted form the cloudinary"
        })


    } catch (error) {
        return res.status(500).json({
            message: "Internal server error occured "
        })
    }
}
//  controller to get a post 
export const getPost = async (req,res)=>{
    const postId= req.params.postId
    try{
        //  check whether there exists any post with this id or not if exists then get it and give it

    
        const post = await postModel.findOne({
            _id:postId
        })

        if(!post) return res.status.json({
            message:" no such post exists with this ID "
        })

        return res.status(200).json(post)
    }
    catch(error){
        return res.status(500).json({
            message: "Some internal server error occurred while working with the database "
        })
    }
}
//  get the post details
export const postLikes= async (req,res)=>{
    const postId = req.params.postId
    try {
        const post =await postModel.aggregate([
            {
                $match:{
                    _id: new mongoose.Types.ObjectId(postId)
                }
            },
            {
                $unwind:'likes'
            },
            {
                $lookup:{
                    from:'users',
                    localField:'likes.user',
                    foreignField:'_id',
                    as:"likes.user"
                }
            },
            {
                $addFields:{
                    "likes.user":{
                        $arrayElemAt:['$likes.user',0]
                }
            }
        },
        {
            $group:{
                _id:'$_id',
                root:'$$ROOT',
                likes:{
                    $push:{
                        user:'$likes.user',
                        likedAt:'$likes.likedAt'
                    }
                }
            }
        },
        {
            $replaceRoot:{
                $newRoot:{
                    $mergeObjects:[
                        '$root',
                        {
                            likes:'$likes'
                        }
                    ]
                }
    
            }
        }
            
        ])
        if(!post) return res.status(404).json({
            message: "No such post exists"
        })
        const usersLikedPostList= post.likes
        return res.status(200).json({
            likesCount:post.likeCount,
            likes:usersLikedPostList
            
        })
    } catch (error) {
        console.log("some error occurred " , error)
        return res.status(500).json({
            message:"internal server occurrs"
        })  
    }

}
export const getPostShares= async (req,res)=>{
    const postId = req.params.postId
    const page= req.query.page || 1
const limit= req.query.limit || 20
const skip= (page-1)*limit
    try {
       const post =await postModel.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(postId) }

        },
        {
            $unwind:'$shares'
        },
        {
            $lookup:{
                from:'users',
                localField:'shares.user',
                foreignField:'_id',
                as:'share.user'
            }
        },
   
        {
            $addFields: {
              'user.share': { $arrayElemAt: ["$share.user", 0] }
            }
        },
        {
            $project:{
               
                'userSharedPost.username':1,
                'userSharedPost.fullname':1,
                'userSharedPost.avatar':1
            }
        },
        {
            $skip:skip,
        }
        ,{
            $limit:limit
        },
        {
            $group:{
                _id:'$_id',
                root:'$$ROOT',
               share:{
                $push:{
                     user:'$share.user',
                     sharedAt:'$share.sharedAt'
                }
               }
            }
        },
        {
            $replaceRoot:{
                $newRoot:{
                    $mergeObjects:[
                        '$root',
                        {share:'$share'}
                    ]
                
                }
            }
        }
       ])
        if(!post ) return res.status(404).json({
            message: "No shares exists"
        })
        return res.status(200).json({
            shareList: post.shares,
            shareCount:post.shareCount
        })
    } catch (error) {
        console.log("some error occurred " , error)
        return res.status(500).json({
            message:"internal server occurrs"
        })
        
    }
}
export const getPostComments= async (req,res)=>{
    const postId = req.params.postId
    try {
        const post  = await postModel.aggregate([
            {
                $match:{
                    _id: new mongoose.Types.ObjectId(postId)
                }
            },{
                $lookup:{
                    from:'comments',
                    localField:'comments',
                    foreignField:'_id',
                    as:"comments"
                }
            },
            {
                $project:{
                    "comments.post":0
                }
            },
            {
                $unwind:'$comments'
            },
            {
                $lookup:{
                    from:'users',
                    localField:'comments.user',
                    foreignField:'_id',
                    as:'comment.user'
                }
            },
            {
                $unwind:'$comments.user'
            },
            {
                $project:{
                    'comments.user._id':1,
                    'comments.user.username':1,
                    'comments.user.fullname':1,
                    'comments.user.avatar':1
                }
            },
            {
                $group:{
                    _id:'$_id',
                    root:{
                        $first:'$$ROOT'
                    },
                    comments:{
                        $push:{
                            user:'$comments.user',
                            text:'comments.text'
                        }
                    }

                }
            },
            {
                $replaceRoot:{
                    $newRoot:{
                        $mergeObjects:[
                        "$root",
                        {
                            comments: '$comments'
                        }
                    ]
                    }
                
                }
            }
        ])
        if(!post) return res.status(404).json({
            message: "No such post exists"
        })
        const commentedUsersList= post.comments
        return res.status(200).json({
            commentedCount: commentedUsersList.length,
           commentedUsersList:post.commentCount
        })
    } catch (error) {
        console.log("some error occurred " , error)
        return res.status(500).json({
            message:"internal server occurrs"
        })
        
    }
}
// update controllers 
export const updateCaption= async (req,res)=>{
    const postId= req.params.postId
    const updatedCaption= req.body.caption
    try {
        const post = await postModel.updateOne({
            _id:postId
        },{
            $set:{
                caption:updatedCaption
            }
        })
        return res.status(200).json({
            message:"post caption updated "
        })

    } catch (error) {
        return res.status(500).json({
            message:"Internal server error occurred "
        })
    }
}

//  like ,comment ,share a post 

export const likePost = async (req, res) => {
    const likedPost = req.params.postId;
    const userId = req.body.userId;

    try {
        // Check if the user has already liked the post
        const isUserLiked = await postModel.exists({
            _id: likedPost,
            "likes.user": userId
        });

        if (isUserLiked) {
            return res.status(200).json({
                message: "User has already liked the post"
            });
        }

        // User has not liked the post, proceed with like
        const updatePostLike = await postModel.updateOne(
            { _id: likedPost },
            {
                $inc: { likeCount: 1 },
                $push: { "likes": { user: userId } }
            }
        );

        if (updatePostLike.modifiedCount > 0) {
            // Update the user's liked posts list
            await userModel.updateOne(
                { _id: userId },
                { $push: { likedPosts: likedPost } }
            );

            // Fetch the updated post to get the latest likeCount
            const updatedPost = await postModel.findById(likedPost, "likeCount");

            return res.status(200).json({
                message: "Post like updated",
                updatedLikeCount: updatedPost.likeCount
            });
        } else {
            return res.status(400).json({
                message: "Failed to update like"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Some error occurred while updating like"
        });
    }
};


//  updating post comments while user comment on a post 

export const commetOnPost=async (req,res)=>{
    const postId= req.params.postId
    const userId= req.body.userId
    const commentContent= req.body.comment
let comment;
    try {
       // create a comment using the comment Model
        comment= await commentModel.create({
        user:userId,
        post:postId,
        text:commentContent
       })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"there is a issue while creating the comment "
        })
    }
    try {
        // comment is created we have to update the comment in the user and post 

        const user= await userModel.updateOne({
            _id:userId
        },
    {
        $push:{
            commentsList:comment._id
        }
    })

    const post = await postModel.updateOne({
        _id:postId
    },{
        $inc:{commentCount:1},
        $push:{
            comments:comment._id
        }
    })
    return res.status(200).json({
        message: "Comment added successfully",
        comment
    });
 
    } catch (error) {
        console.log(error);
   return res.status(500).json({
       message: "There was an issue updating the user or post"
   });
    }
}


// share a post 
export const sharePost= async (req,res)=>{
    const postId=req.params.postId
    const userId= req.body.userId

    try {
        const post= await postModel.updateOne(
           { 
                _id: postId
            
        },
        {
            $push:{
                shares:{
                    user:userId
                }
            },
            $inc:{
                sharesCount:1
            }
        }
        )
        if(post.modifiedCount>0) {
            
            const updatedPost = await postModel.findById(postId, "sharesCount");

            return res.status(200).json({
            message: "post share list and share count updated ",
            shareCount:updatedPost.sharesCount
        })
}
        return res.status(500).json({
            message: "Error while updating share count"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"internal server error occurred"
        })
    }
}