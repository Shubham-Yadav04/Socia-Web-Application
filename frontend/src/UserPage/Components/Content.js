import PostsContent from './PostsContent'
import CreatePost from './CreatePost';

import useContentContext from '../../context/ContentContext';
import ProfileSection from './ProfileSection';
import { useEffect } from 'react';
import ExploreSection from './ExploreSection';
import ChatList from './ChatList';
import Setting from './Setting';
import { useSelector } from 'react-redux';

function Content() {
  const {view} = useContentContext();
const user= useSelector(state=> state.user.user)
useEffect(()=>{
  console.log(view);
},[view])
  return (
    <section className="flex flex-col px-4 items-center md:ml-[150px] overflow-y-scroll hide-scrollbar pt-3 gap-3 md:w-[70vw] w-full pb-2 h-screen md:border-r dark:border-gray-700">
    {view==="home" && <PostsContent/> }
   {view==="search" && <ExploreSection/>}
   {view==="post" && <CreatePost/>}
   {view==="profile" && <ProfileSection id={user._id} />}
   {view==="messages" && <ChatList/>}
   {view==="settings" && <Setting/>}
   


      
    </section>
  )
}

export default Content
