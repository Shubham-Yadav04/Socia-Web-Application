import React from "react";
import Pencil from "../svgs/Pencil";
import Trash from "../svgs/Trash";
import Heart from "../svgs/Heart";
import Comment from "./Comment.js";
import Share from "../svgs/Share";
import { useState } from "react";
import Profile from "../svgs/Profile";
import CommentIcon from "../svgs/CommentIcon.js";

function Post(props) {
  const {
    username = "user123",
    postId,
    caption = "this is the first post ",
    image,
    content = "hey now i am going to create my first post actually i dont know what to post or say in the first ever post so just posted anything random thoughts which i got ",
    likes = 34,
    commentsCount = 34,
commentList=[<Comment/>,<Comment/>],
    shares = 23,
    onDelete,
    onEdit,
  } = props;

//   props.comments --- it will replace the commentList 
 
  const [likeCount, setLikeCount] = useState(likes);
  const [commentCount, setCommentCount] = useState(commentsCount);
  const [shareCount, setShareCount] = useState(shares);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [commentSection, setCommentSection] = useState(false);
  const [comments, setComments] = useState(commentList);
  const [commentText, setCommentText] = useState("");
  const [followed, setFollwed] = useState(false);
  const updateLike = () => {
    // increase the likes on the post
    console.log("clicked");
    if (isPostLiked) {
      setLikeCount((prev) => prev - 1);
      setIsPostLiked(false);
    } else {
      setLikeCount((prev) => prev + 1);
      setIsPostLiked(true);
    }
  };

  const handleShare = () => {};

  return (
    <article className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow max-w-xl mx-auto my-4 ">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-2 items-center">
          {props.userProfile ? (
            <img></img>
          ) : (
            <Profile width={"40"} height={"40"} />
          )}
          <h2 className="font-bold text-sm flex flex-col p-1">
            @{username}{" "}
            <button
              className={`w-fit px-1  rounded-md text-[8px] font-medium text-white ${followed?"bg-gray-600":"bg-blue-600"}`} 
              onClick={() => setFollwed((prev) => (prev===true ? false : true))}
            >
              {followed ? "UnFollow" : "Follow"}
            </button>
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Edit"
          >
            {/* Pencil SVG */}
            <Pencil />
          </button>

          <button
            onClick={onDelete}
            className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900"
            aria-label="Delete"
          >
            {/* Trash SVG */}
            <Trash />
          </button>
        </div>
      </div>

      {image && (
        <div className="mb-2">
          <img
            src={image}
            alt="Post visual"
            className="w-full h-auto rounded-lg object-cover max-h-80"
          />
        </div>
      )}
      {content && (
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
          {content}
        </p>
      )}

      {caption && (
        <div className="mb-2">
          <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
            {caption}
          </span>
        </div>
      )}
      <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-sm mt-2   ">
        <div className="flex items-center gap-4">
          {typeof likes !== "undefined" && (
            <span className="flex items-center gap-1" onClick={updateLike}>
              {/* Heart SVG */}
              <Heart isPostLiked={isPostLiked} />
              {likeCount}
            </span>
          )}
          {typeof commentCount !== "undefined" && (
            <span className="flex items-center gap-1" onClick={()=>setCommentSection((prev)=>prev===true?false:true)}>
              {/* Comment SVG */}
              <CommentIcon />
              {commentCount}
            </span>
          )}
          {typeof shares !== "undefined" && (
            <span className="flex items-center gap-1" onClick={handleShare}>
              {/* Share SVG */}
              <Share />
              {shareCount}
            </span>
          )}
        </div>
      </div>
      {commentSection ? (
        <div className="w-full h-fit min-h-[100px] bg-blue-100 mt-4">
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
              // onClick={postComment}
            >
              Post
            </button>
          </div>
          <div className="mt-3 space-y-2 max-h-40 overflow-y-auto w-full hide-scrollbar">
            {(comments || []).map((comment, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-700 rounded px-3 py-2 text-sm break-words"
              >
                {comment}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </article>
  );
}

export default Post;
