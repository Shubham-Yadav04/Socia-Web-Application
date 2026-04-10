
import useContentContext from "../../context/ContentContext";
import FollowButton from "./FollowButton";

const SuggestionProfile = ({profileId, profileImg, username }) => {
const {setProfileInView, setView}=useContentContext();
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 flex flex-col md:flex-row items-center md:items-start w-[100px] md:w-[250px]  max-w-xs  transition-colors gap-2 h-fit"
        onClick={()=>{
            setProfileInView(profileId);
            setView("profile");
        }}
        >
            <img
                src={profileImg}
                alt={`${username}'s profile`}
                className="w-16 h-16 md:w-30 md:h-30 rounded-full object-cover mb-3 border-2 border-gray-300 dark:border-gray-700"
            />
            <div className="flex flex-col items-center md:h-full md:items-start px-1"> 
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {username}
            </span>
            <FollowButton  profileId={profileId} />
            </div>
        </div>
    );
};

export default SuggestionProfile;