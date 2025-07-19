import React, { useEffect } from "react";
import Pencil from "../svgs/Pencil";
import Trash from "../svgs/Trash";
import Heart from "../svgs/Heart";
import Comment from "./Comment.js";
import Share from "../svgs/Share";
import { useState } from "react";
import Profile from "../svgs/Profile";
import CommentIcon from "../svgs/CommentIcon.js";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../context/UserSlice.js";
import { useSelector } from "react-redux";
import {AnimatePresence, motion} from 'motion/react'
function Post(props) {
  const {
    username,
    id,
    caption,
    media,
    content,
    likes,
    commentsCount,
    commentList,
    shares,
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
  const [share, setShare] = useState(false);
const [postDelete,setPostDelete]=useState(false)
  const [shareTo, setShareTo] = useState([]); // it will have the list of the chatroom where user wants to send the posts
  const user = useSelector((state) => state.user.user);
  const friends=user?.friends || [
    {
      username: "shubham!243",
    },
    {
      username: "1223_rayliegh",
    },
    {
      username: "billionaire_Shubham",
    },
  ];
  const dispatch = useDispatch();
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
  const postComment = () => {
    // take the user detail like username user profile , profileId  whose comment is this which is going to be posted
    console.log("posting a comment ");
    const comment = {
      username: "@user123",
      text: commentText,
      replies: [],
      commentLike: 0,
      replyCount: 0,
    };
    setComments((prev) => [...prev, comment]);
    setCommentCount((prev) => prev + 1);
    setCommentText("");
  };

  const onEdit = () => {};
  const onDelete = () => {
    
    // fire a backend request to remove the post on success remove it from the state also
    dispatch(deletePost({ id }));
    console.log("post deleted");
    setPostDelete(false)
  };
  const scrollRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction) => {
    if (
      (activeIndex === 0 && direction === "left") ||
      (activeIndex === media.length - 1 && direction === "right")
    )
      return;

    const itemWidth = scrollRef.current.clientWidth;
    const scrollAmount = direction === "left" ? -itemWidth : itemWidth;
    scrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
    if (direction === "right") setActiveIndex((prev) => prev + 1);
    else setActiveIndex((prev) => prev - 1);
  };

  useEffect(() => {
    console.log("rerendering the component");
  }, [commentList]);

  const handleShare = () => {
   
    // on selection of the user send the post url or id to the chatroom
    // on success
  
    setShare(false)
    setShareCount((prev) => (prev += shareTo.length));

    setShareTo([]);
  };

  // hard coded on adding backend i have to remove the hard codded value


  return (
    <article className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow md:w-[80%] w-full  mx-auto my-4 relative">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-2 items-center">
          {props.userProfile ? (
            <img alt="profilepic"></img>
          ) : (
            <Profile width={"40"} height={"40"} />
          )}
          <h2 className="font-bold text-sm flex flex-col p-1">
            @{username}
            <button
              className={`w-fit px-1  rounded-md text-[8px] font-medium text-white ${
                followed ? "bg-gray-600" : "bg-blue-600"
              }`}
              onClick={() =>
                setFollwed((prev) => (prev === true ? false : true))
              }
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
            onClick={()=>setPostDelete(true)}
            className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900"
            aria-label="Delete"
          >
            {/* Trash SVG */}
            <Trash />
          </button>
        </div>
      </div>

      {media.length>0 && (
        <div className="relative w-full">
          {/* Scroll buttons */}
          <button
            onClick={() => scroll("left")}
            className={`absolute left-1 top-1/2 -translate-y-1/2 hover:bg-white/80 text-gray-700 rounded-full shadow-md p-1 z-10  ${
              activeIndex === 0 ? "hidden" : "flex"
            }`}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => scroll("right")}
            className={`absolute right-1 top-1/2 -translate-y-1/2  hover:backdrop-blur-lg hover:bg-white/80 text-gray-700 rounded-full shadow-md p-1 z-10  ${
              activeIndex === media.length - 1 ? "hidden" : "flex"
            }`}
          >
            <ChevronRight size={24} />
          </button>

          {/* Media container */}
          <div
            ref={scrollRef}
            className="mb-2 w-full overflow-x-scroll md:overflow-hidden hide-scrollbar flex gap-2 items-center  snap-x snap-mandatory"
          >
            {media.map((media, idx) =>
              media && media.type.startsWith("image") ? (
                <img
                  key={idx}
                  src={media.url}
                  alt="Preview"
                  className="h-auto w-full min-w-full rounded-lg object-cover snap-start transition-all duration-300 ease-in-out mx-5"
                />
              ) : media && media.type.startsWith("video") ? (
                <video
                  key={idx}
                  src={media}
                  controls
                  className="h-auto w-full min-w-full rounded-xl object-cover snap-start transition-all duration-300 ease-in-out shadow-md"
                />
              ) : null
            )}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-2 mb-2">
            {media.map((_, idx) => (
              <span
                key={idx}
                className={`h-2 w-2 rounded-full ${
                  activeIndex === idx ? "bg-blue-600" : "bg-gray-300"
                } transition-all duration-300`}
              ></span>
            ))}
          </div>
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
            <span
              className={`flex items-center gap-1 ${
                commentSection
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() =>
                setCommentSection((prev) => (prev === true ? false : true))
              }
            >
              {/* Comment SVG */}
              <CommentIcon />
              {commentCount}
            </span>
          )}

          <span
            className="flex items-center gap-1"
            onClick={() => {
              console.log("clicked");
              setShare((prev) => (prev === true ? false : true));
            }}
          >
            {/* Share SVG */}
            <Share />
            {shareCount}
          </span>
        </div>
      </div>
      {commentSection ? (
        <div className="w-full h-fit min-h-[100px]  mt-2">
          <div className="px-3 pt-1 w-full flex gap-2">
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
              Post
            </button>
          </div>
          <div className="mt-2 space-y-2 max-h-40 overflow-y-auto w-full hide-scrollbar">
            {(comments || []).map((comment, idx) => (
              <Comment
                key={idx}
                username={comment.username}
                profilePic={comment.profilePic}
                replyList={comment.replyList}
                likes={comment.likes}
                replies={comment.replies}
                text={comment.text}
              />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
      {share && (
        <motion.div className="w-full flex flex-col gap-2 absolute left-0 bottom-0 bg-white dark:bg-gray-800 rounded-t-xl shadow-lg z-10 py-2"
        initial={{
          y:50,
          scaleY:0.3
        }}
        animate={{
          scaleY:1,
          y:0,
          transition:{
            duration:0.5
          }
        }}
        
        >
          <div
            className="w-full max-h-60 sm:max-h-50 md:max-h-80 overflow-y-scroll
             grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-2 
              px-4 py-3 z-10 
              hide-scrollbar relative">
            {friends?.map((friend, idx) => {
              const isSelected = shareTo.some(
                (share) => share.username === friend.username
              );

              return (
                <div
                  key={idx}
                  className="w-[50px] flex  gap-2 cursor-pointer "
                  onClick={() => {
                    if (isSelected) {
                      setShareTo((prev) =>
                        prev.filter(
                          (share) => share.username !== friend.username
                        )
                      );
                    } else {
                      setShareTo((prev) => [...prev, friend]);
                    }
                  }}
                >
                  <div className="flex flex-col md:flex-row gap-1 w-fit relative">
                    {friend.profilePic ? (
                      <img
                        src={`${friend.profilePic}`}
                        alt="profilePic"
                        className="w-[35px] h-[35px] rounded-full object-cover object-center"
                      />
                    ) : (
                      <Profile width={35} height={35} />
                    )}
                    <span className="absolute top-0 right-0 text-[10px]">
                      {isSelected ? (
                        <span className="inline-flex items-center justify-center w-3 h-3 bg-blue-600 rounded-full">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-white"
                          >
                            <path
                              d="M4 7.5L6 9.5L10 5.5"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-black dark:text-gray-200">
                    {friend.username}
                  </span>
                </div>
              );
            })}
            <div></div>
          </div>
          <button
            className="w-[25%] mx-auto px-2 py-1 bg-blue-600 text-sm font-bold text-white rounded-lg"
            onClick={handleShare}
          >
           Share
          </button>
        </motion.div>
      )}
      {

        postDelete===true &&
      
        <motion.div className="w-full h-full flex justify-center items-center backdrop-blur-sm absolute inset-0 z-20 rounded-xl"
        initial={{
          y:50,
          scaleY:0.4
        }}
        animate={
          {
            y:0,
            scaleY:1,
            transition:{
              duration:0.5
            }
          }
        }
      
        >
        <div className="w-[60%] p-3 flex flex-col items-center rounded-xl  ">
          <h1> Do you want to Delete this Post</h1>
          <div className="flex gap-2 px-4">
            <button className=" text-sm font-bold px-2 py-1 rounded-lg bg-blue-600" onClick={()=>setPostDelete(false)}>
              No
            </button >
            <button className=" text-sm font-bold px-2 py-1 rounded-lg bg-red-600" onClick={onDelete}>
              Yes
            </button>

          </div>
          </div>
        </motion.div>
    
      }
    </article>
   
  );
}

export default Post;
