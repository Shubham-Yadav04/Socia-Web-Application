import React from 'react'
import Profile from '../svgs/Profile'
import Gallery from '../svgs/Gallery';
import { useState,useEffect} from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../context/UserSlice';
import { ChevronLeft, ChevronRight } from 'lucide-react';



function CreatePost(props) {
const [caption, setCaption] = React.useState('');
const [media, setMedia] = React.useState(null);
const [mediaPreview, setMediaPreview] = React.useState(null);
const [content,setContent]=useState("")

const user=useSelector(state=>state.user.user)
const dispatch=useDispatch()
const handleMediaChange = (e) => {
    const file = e.target.files;// gives a file map whose key are index 
    const files=Array.from(file)
    if (files) {
        setMedia(files);
        setMediaPreview(files.map(file=>URL.createObjectURL(file)));// media preview contains only the url
    }
};

const handleCaptionChange = (e) => {
    setCaption(e.target.value);
};

const handlePost=()=>{
    // trigger the backend api to create a post based on the data such as caption media user 
    console.log("clicked for post creation")
    const post={
      id:1,
        content,
        caption,
        media:media?media.map(media=>(
          {url:URL.createObjectURL(media),type:media.type}
        )
        ):[],
        likes:0,
        commentsCount:0,
        shares:0,
        username:user?user.username: "user123",
        commentList:[]
    }

    // now pass it to the backend api handling the post creation 
    // on success update the state of the post in the context 
dispatch(addPost(post));
console.log("post created ")
setCaption('')
setContent('')
setMedia(null)
setMediaPreview(null)
}

const scrollRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  
  

  const scroll = (direction) => {
    if((activeIndex===0 && direction==="left")||(activeIndex===media.length-1 && direction==="right")) return 
  
    const itemWidth=scrollRef.current.clientWidth
    const scrollAmount = direction === "left" ? -itemWidth : itemWidth;
    scrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
    if(direction==='right') setActiveIndex(prev=>prev+1)
        else setActiveIndex(prev=>prev-1)
  };




return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg w-[90%] md:w-[70%] h-fit " id='post'>
        {/* User profile and name */}
        <div className="flex mb-3 gap-3 items-center">
            {props.image ? (
                <img
                    src={props.profile}
                    alt="User profile"
                    className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-700"
                />
            ) : (
                <Profile width={"50"} height={"50"} />
            )}
            <span className="font-medium text-gray-800 dark:text-gray-200 text-base md:text-lg truncate">
                {props.name}
            </span>
        </div>
        {mediaPreview && (
              <div className="relative w-full">
      {/* Scroll buttons */}
      <button
        onClick={() => scroll("left")}
        className={`absolute left-1 top-1/2 -translate-y-1/2 hover:bg-white/80 text-gray-700 rounded-full shadow-md p-1 z-10  ${activeIndex===0?"hidden":"flex"}`}
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => scroll("right")}
        className={`absolute right-1 top-1/2 -translate-y-1/2  hover:backdrop-blur-lg hover:bg-white/80 text-gray-700 rounded-full shadow-md p-1 z-10  ${activeIndex===media.length-1?"hidden":"flex"}`}
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
              src={mediaPreview[idx]}
             
              alt="Preview"
              className="max-h-48 w-full min-w-full rounded-lg object-cover snap-start transition-all duration-300 ease-in-out mx-5"
            />
          ) : media && media.type.startsWith("video") ? (
            <video
              key={idx}
              src={mediaPreview[idx]}
              controls
              className="max-h-48 w-[370px] md:w-[550px] rounded-xl object-cover snap-start transition-all duration-300 ease-in-out shadow-md"
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
        <textarea
            placeholder="What's happening?"
            className="w-full p-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg resize-none mb-2"
            rows="3"
            value={content}
            onChange={(e)=>setContent(e.target.value)}
        ></textarea>
        <textarea
            placeholder="Any Captions .."
            className="w-full p-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg resize-none mb-2"
            rows="1"
            value={caption}
            onChange={handleCaptionChange}
        ></textarea>

        <div className="flex  md:flex-row md:items-center gap-2">
            <label className="cursor-pointer flex items-center gap-2 text-blue-600 hover:bg-gray-900 bg-blue-600 rounded-md p-1">
                <input
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    multiple
                    onChange={handleMediaChange}
                />
                {/* Gallery SVG */}
              <Gallery/>
                
            </label>
            <button className="px-2 py-1 text-md bg-blue-600 text-white rounded hover:bg-blue-700 font-medium w-fit hover:bg-gray-900" onClick={handlePost}>
                Post
            </button>
        </div>
    </div>
)
}

export default CreatePost
