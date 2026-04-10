import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import Profile from "../svgs/Profile";
import Post from "./Post";
import { useSelector } from "react-redux";
import ProfileMenu from "./ProfileMenu";
import {  Pencil } from "lucide-react";
import useContentContext from "../../context/ContentContext";
import { AnimatePresence ,motion} from "motion/react";
import UpdateProfile from "./UpdateProfile";
function ProfileSection() {
  const [activeTab, setActiveTab] = useState("posts");
  const [profileChangeSection, setProfileChangeSection] = useState(false);
  const {profileMenu,setProfileMenu}=useContentContext();
  const {viewProfile,setViewProfile,profilePreview,setProfilePreview,profileInView} =useContentContext();
  const user = useSelector((state) => state.user.user);
  const userPosts = useSelector((state) => state.user.posts);
  function formatDate(isoString) {
    const date = new Date(isoString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

const [currentProfile, setCurrentProfile] = useState(null);
  const fetchProfile= useCallback(async(id)=>{
   const res= await fetch(`http://localhost:8585/users/id/${id}`).then(res=>res.json());
   return res;
  },[])
const isOwnProfile = profileInView === user._id;
useEffect(() => {
  if (isOwnProfile) {
    setCurrentProfile({ profile: user, posts: userPosts });
    return;
  }
  const loadProfile = async (id) => {
    const data = await fetchProfile(id);
    // console.log("fetched profile data ",data)
    const profile=data
    const posts= data.userPosts;  
    setCurrentProfile({profile,posts:posts});
  };

  loadProfile(profileInView);
}, [profileInView, user, userPosts, isOwnProfile, fetchProfile]);
  const handleCroppedImage = (blob) => {
    // Send `blob` to backend
    const formData = new FormData();
    formData.append("profileImage", blob, "profile.png");
setProfilePreview(null)
  };
  // console.log("current profile ",currentProfile)
  const handleDetailEdit = () => {};
  return (
    <div className=" w-full p-3 text-gray-800 dark:text-gray-100 relative " onClick={(e)=>{
      if(isOwnProfile){
      setProfileChangeSection(false)
      setProfileMenu(false)
      }
      setViewProfile(false)
    }}>

  <AnimatePresence>
    {
profilePreview && 
<div className="h-fit w-full absolute inset-0 flex justify-center items-center bg-gray-800 z-30">
=
  <UpdateProfile file={profilePreview} onCropped={handleCroppedImage} />
 
  </div>
    }
    {
      viewProfile && <motion.div className="w-full h-screen absolute top-0 bg-black bg-opacity-30 z-20 flex items-center justify-center bg-red-300" onClick={(e)=>{
      setViewProfile(false)  
      }
      }
      initial={{
        scale:0,
        opacity:0.2
      }}
      animate={
        {
          scale:1,
          opacity:1
        }
      }
      exit={{
        scale:0,
        opacity:0.2
      }}
      >

        <div className=" w-[50%] h-[60%] mx-auto flex items-center justify-center ">
          {
            currentProfile.profile?
            <img src={currentProfile.profile.avatar} alt="Profile" className="w-full h-full object-cover" />
            :
            <Profile height={"100%"} width={"100%"} />
          }
        </div>

      </motion.div>  
}
      </AnimatePresence>
    
      <div className="flex flex-wrap items-start gap-4">
        <div
          className=" w-[80px] md:w-[120px] relative"
          onMouseEnter={() => {if(isOwnProfile) setProfileChangeSection(true)}}
          onMouseLeave={()=>{
            if(isOwnProfile) {setProfileChangeSection(false)
          }}}
        >
          {currentProfile!==null && currentProfile.avatar? (
            <img
              src={currentProfile.avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <Profile width={'100%'} height={120} />
          )}
          {profileChangeSection && (
            <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-black rounded-full flex items-center justify-center z-10   cursor-pointer"
            onClick={(e)=>{
              setProfileMenu(prev=>!prev);
              e.stopPropagation();
            }}
            >
              <h1 className="text-center w-1/2 text-sm text-gray-200 text-blue-300">Change Profile</h1>
            </div>
          )}
          <AnimatePresence>
          {
            
            profileMenu && 
            
            <ProfileMenu />
            
          }
          </AnimatePresence>
        </div>
        <div className="flex-1 relative pt-3">
          <div
            className="w-fit h-fit hover:rounded-sm  hover:bg-gray-200 dark:hover:bg-gray-800 absolute top-2 right-6 p-1"
            onClick={handleDetailEdit}
          >
            {isOwnProfile && (
              <Pencil stroke="#3777db" width={15} height={15} />
            )}
          </div>
          <h2 className="text-lg font-semibold">{currentProfile?.profile?.username}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">{currentProfile?.profile?.bio}</p>
          <div className="flex gap-6 text-sm mt-2 text-gray-500 dark:text-gray-400">
            <span>
              <strong>
                {currentProfile?.profile?.followersCount || 0}
              </strong>{" "}
              Followers
            </span>
            <span>
              <strong>
                {currentProfile?.profile?.follwingsCount || 0}
              </strong>{" "}
              Following
            </span>
            <span>
              <strong >{currentProfile?.posts?.length || 0} </strong> Posts
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-6 border-b border-gray-300 dark:border-gray-700">
        <button
          className={`py-2 px-4 font-semibold ${
            activeTab === "posts"
              ? "border-b-2 border-black dark:border-white text-black dark:text-white"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("posts")}
        >
          Posts
        </button>
        <button
          className={`py-2 px-4 font-semibold ${
            activeTab === "about"
              ? "border-b-2 border-black dark:border-white text-black dark:text-white"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "posts" ? (
          <div className="w-full flex flex-col gap-2">
            {currentProfile && currentProfile.posts?.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-sm space-y-1">
            <p>
              <strong>Name:</strong> {currentProfile?.profile?.fullname}
            </p>
            <p>
              <strong>Email:</strong> {currentProfile?.profile?.email}
            </p>
            <p>
              <strong>Joined:</strong> {formatDate(currentProfile?.profile?.createdAt)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileSection;
