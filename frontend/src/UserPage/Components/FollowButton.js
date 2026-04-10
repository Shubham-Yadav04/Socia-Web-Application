import React, { useRef } from 'react'
import { follow, unfollow } from '../Functions/Follow';
import { useDispatch,useSelector } from 'react-redux';
import { updateFollowings } from '../../context/UserSlice';

function FollowButton({profileId}) {
    const dispatch= useDispatch();
    const userId = useSelector(state => state.user.user._id);
  const isFollowing = useSelector(state =>
    state.user?.followings?.some(
  id => id === profileId
)
  );
  const handleFollow=async()=>{
        try {
            const result= await follow(userId,profileId);
            if(result===200){
                console.log("followed the user successfully ");
    dispatch(updateFollowings({profileId, isFollow: true}));
   
            }
        } catch (error) {
            console.log(error.message);
        }
  }
   const handleUnfollow=async()=>{
        try {
            const result= await unfollow(userId,profileId);
            if(result===200){
                console.log("unfollowed the user successfully ");
    dispatch(updateFollowings({profileId,isFollow: false }));
            }
        } catch (error) {
            console.log(error.message);
        }
  }
    
  return (
    <button
      className={`w-fit px-1 rounded-md text-[8px] font-medium text-white ${
        isFollowing ? "bg-gray-600" : "bg-blue-600"
      } ${profileId === userId ? "hidden" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        isFollowing ? handleUnfollow() : handleFollow();
      }}
    >
      {isFollowing ? "UnFollow" : "Follow"}
    </button>
  )
}

export default FollowButton