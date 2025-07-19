import React, { useEffect, useState } from 'react'
import Profile from '../svgs/Profile'
import {motion} from 'motion/react'
function Comment(props) {
    const {
        postId, // ye bta ga ki comment kis post pr hai 
        commentId , // comment ki id hogi ek 
        profilePic,
        username,
        replyList,
       likes,
        replies,
        text

    }= props
    const [showReply,setShowReply]=useState(false)
    const [replyBox,setReplyBox]=useState(false)
    const [commentText,setCommentText]=useState("")
    const [commentLikes,setCommentLikes]=useState(likes)
    const [isCommentLiked,setIsCommentLiked]=useState(false)
    const [commentReplies,setCommentReplies]= useState(replyList||[])
    const [replyCount,setReplyCount]= useState(replies )
    const handleReply=()=>{
setReplyBox(true)
    }
     const postComment = () => {
    // take the user detail like username user profile , profileId  whose comment is this which is going to be posted 
    console.log("posting a comment ")
    const comment={
        username:"@user123",
        text:commentText,
        replies:replyList,
        commentLike:commentLikes,
        replyCount:0
    }
    setCommentReplies(prev=>[...prev,comment])
    setReplyCount(prev=>prev+1)
    console.log("comment posted ")
    console.log(commentReplies)
    setShowReply(true);
    setCommentText("");
  };
  const handleCommentLike=()=>{
if(isCommentLiked){
    setCommentLikes(prev=>prev-1);
    setIsCommentLiked(false)
}
else{
    setCommentLikes(prev=>prev+1)
    setIsCommentLiked(true)
}
  }
  useEffect(()=>{
   
console.log("rerendering the component")
  },[])
return (
    <motion.div className="comment-container rounded-lg px-4 py-1  max-w-xl w-full bg-white dark:bg-gray-900 transition-colors duration-200 " layout>
        <div className="flex gap-1 mb-2">
           { profilePic?<img
                src="https://via.placeholder.com/40"
                alt="User Profile"
                className="w-10 h-10 rounded-full mr-3 border border-gray-200 dark:border-gray-700"
            />:
            <Profile width={"30"} height={"30"}/>
            }
            <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{username|| "@user123"}</div>
            </div>
        </div>
        <div className="text-xs mb-3 px-3 text-gray-800 dark:text-gray-200">
            {text}
        </div>
        <div className="flex items-center mb-3 gap-2">
            <motion.button className={`bg-transparent border-none text-blue-600 dark:text-blue-400 cursor-pointer mr-2 hover:underline focus:outline-none`} onClick={handleCommentLike}
            animate={
                isCommentLiked?{
                    scale:1.15,
                }:
               null
            }
            >
                👍{commentLikes}
            </motion.button>
            <button className="bg-transparent border-none text-blue-600 dark:text-blue-400 cursor-pointer hover:underline focus:outline-none disabled:text-gray-300" onClick={()=>setShowReply(prev=>prev===true?false:true)} disabled={replyCount<=0}>
                View Replies {replyCount>0?replyCount:""}
            </button>
             <button className="bg-transparent border-none text-blue-600 dark:text-blue-400 cursor-pointer hover:underline focus:outline-none" onClick={handleReply}>
                reply
            </button>
        </div>
        {showReply?<div className="mb-1 w-full ">
           {
            commentReplies.map((comment,idx)=>(
                
                    <Comment key={idx} username={comment.username} profilePic={comment.profilePic} replyList={comment.replyList} likes={comment.likes} replies={comment.replies} text={comment.text}/>
                
            ))
           }
        </div>:
        <></>} 
        {
            replyBox?
           <div className="p-3 w-full flex gap-2">
            <input
              name="comment"
              type="text"
              className="flex-1 px-3 py-2 w-[80%] rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
              placeholder="Add a comment..."
              autoComplete="on"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              onClick={postComment}
            >
              Reply
            </button>
          </div>
            :
            <></>
        }
    </motion.div>
)
}

export default Comment
