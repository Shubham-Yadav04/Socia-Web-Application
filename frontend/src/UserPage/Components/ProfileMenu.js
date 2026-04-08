
import useContentContext from "../../context/ContentContext";
import {motion} from 'motion/react'
function ProfileMenu() {
  const { setViewProfile, setProfileMenu ,setProfilePreview} = useContentContext();
   const handleFileChange = (e) => {
     console.log("file")
    const file = e.target.files?.[0];
    if (file) {
      setProfilePreview(file);
    }
  };

  return (
   
      <motion.div className="absolute top-10 -right-[150%] mt-2 w-48 bg-white dark:bg-gray-800 dar border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-10 texr-xs md:text-sm"
      initial={{
        scale:0,
        opacity:0
      }}
      animate={
        {
          scale:1,
          opacity:1,
        }
      }
      exit={{
        scale:0,
        opacity:0
      }}

      >
        <ul>
          <li
            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              setProfileMenu(false);
              setViewProfile(true);
            }}
          > 
            View Profile
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md">
            <label className="text-center w-1/2 text-sm text-gray-200 cursor-pointer" htmlFor="profile-upload">
              Change Profile 
              <input 
              id="profile-upload"
                type="file" 
                accept="image/*" 
                style={{ display: "none" }} 
                onChange={(e)=>
                {
            handleFileChange(e)
            setProfileMenu(false)
                }
            
                } />
                </label>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md">
            Remove Profile
          </li>
        </ul>
      </motion.div>
  );
}

export default ProfileMenu;
