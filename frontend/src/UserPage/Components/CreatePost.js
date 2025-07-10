import React from 'react'
import Profile from '../svgs/Profile'
import Gallery from '../svgs/Gallery';

function CreatePost(props) {
const [caption, setCaption] = React.useState('');
const [media, setMedia] = React.useState(null);
const [mediaPreview, setMediaPreview] = React.useState(null);

const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setMedia(file);
        setMediaPreview(URL.createObjectURL(file));
    }
};

const handleCaptionChange = (e) => {
    setCaption(e.target.value);
};

return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg w-[90%] md:w-[70%]">
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
            <div className="mb-2">
                {media && media.type.startsWith('image') ? (
                    <img
                        src={mediaPreview}
                        alt="Preview"
                        className="max-h-48 w-auto rounded-lg mx-auto"
                    />
                ) : media && media.type.startsWith('video') ? (
                    <video
                        src={mediaPreview}
                        controls
                        className="max-h-48 w-auto rounded-lg mx-auto"
                    />
                ) : null}
            </div>
        )}
        <textarea
            placeholder="What's happening?"
            className="w-full p-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg resize-none mb-2"
            rows="3"
            value={caption}
            onChange={handleCaptionChange}
        ></textarea>

        <div className="flex  md:flex-row md:items-center gap-2">
            <label className="cursor-pointer flex items-center gap-2 text-blue-600 hover:bg-gray-900 bg-blue-600 rounded-md p-1">
                <input
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleMediaChange}
                />
                {/* Gallery SVG */}
              <Gallery/>
                
            </label>
            <button className="px-2 py-1 text-md bg-blue-600 text-white rounded hover:bg-blue-700 font-medium w-fit hover:bg-gray-900">
                Post
            </button>
        </div>
    </div>
)
}

export default CreatePost
