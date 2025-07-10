import React from 'react'
import PostsContent from './PostsContent'
import CreatePost from './CreatePost';

function Content() {
  const { name, profile } = React.useContext(React.createContext({ name: '', profile: '' })); // fallback if not passed as prop

  return (
    <section className="flex flex-col px-4 items-center md:ml-[150px] overflow-y-scroll hide-scrollbar pt-3 gap-3 md:w-[70vw] w-full pb-2">
    <CreatePost name={"Shubham"}/>

      {/* Posts */}
      <PostsContent />
    </section>
  )
}

export default Content
