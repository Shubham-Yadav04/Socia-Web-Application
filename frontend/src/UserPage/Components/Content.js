import PostsContent from './PostsContent'
import CreatePost from './CreatePost';

import useContentContext from '../../context/ContentContext';
import ProfileSection from './ProfileSection';
import { useEffect } from 'react';
import ExploreSection from './ExploreSection';
import ChatList from './ChatList';
import Setting from './Setting';

function Content() {
  const {view,asideView} = useContentContext();

useEffect(()=>{
  console.log(view);
},[view])
  return (
    <section className="flex flex-col px-4 items-center md:ml-[150px] overflow-y-scroll hide-scrollbar pt-3 gap-3 md:w-[70vw] w-full pb-2 h-screen md:border-r dark:border-gray-700">
    {/* {asideView===1 && <ChatList/>}
    {asideView===2 && <Setting/>} */}
    {view===1 && <PostsContent/> }
   {view===2 && <ExploreSection/>}
   {view===3 && <CreatePost/>}
   {view===5 && <ProfileSection/>}


      
    </section>
  )
}

export default Content
