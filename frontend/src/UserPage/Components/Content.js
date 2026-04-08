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
  const {view,asideView} = useContentContext();
const user= useSelector(state=> state.user.user)
useEffect(()=>{
  console.log(view);
},[view])
  return (
    <section className="flex flex-col px-4 items-center md:ml-[150px] overflow-y-scroll hide-scrollbar pt-3 gap-3 md:w-[70vw] w-full pb-2 h-screen md:border-r dark:border-gray-700">
    {view===1 && <PostsContent/> }
   {view===2 && <ExploreSection/>}
   {view===3 && <CreatePost/>}
   {view===5 && <ProfileSection id={user._id} />}
   {view===6 && <ChatList/>}
   {view===7 && <Setting/>}
   


      
    </section>
  )
}

export default Content
