import React from "react";
import { follow } from "../Functions/Follow";
import { useDispatch, useSelector } from "react-redux";
import { updateFollowers } from "../../context/UserSlice";

const SuggestionProfile = ({profileId, profileImg, username }) => {
const user= useSelector(state=>state.user.user)
const dispatch=useDispatch()
const [followed,setFollowed]=React.useState(false);
    const handleFollow=async()=>{
        //console.log("following the user ")

    try {
        const result= await follow(user._id,profileId);
        if(result===200){
            console.log("followed the user successfully ");
dispatch(updateFollowers({profileId}));
        }
        
setFollowed(true);
    } catch (error) {
        console.log(error.message);
    }
    }
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 flex flex-col md:flex-row items-center md:items-start w-[100px] md:w-[250px]  max-w-xs  transition-colors gap-2 h-fit">
            <img
                src={profileImg}
                alt={`${username}'s profile`}
                className="w-16 h-16 md:w-30 md:h-30 rounded-full object-cover mb-3 border-2 border-gray-300 dark:border-gray-700"
            />
            <div className="flex flex-col items-center md:h-full md:items-start px-1"> 
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {username}
            </span>
            <button
                onClick={()=>handleFollow()}
                className={`px-2 bg-blue-600 text-[8px] text-white rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-800 ${followed ? "bg-gray-400 cursor-not-allowed" : ""}`}
            >
                {followed ? "Following" : "Follow"}
            </button>
            </div>
        </div>
    );
};

export default SuggestionProfile;