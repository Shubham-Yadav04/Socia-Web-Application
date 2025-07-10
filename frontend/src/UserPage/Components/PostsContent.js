import React from 'react'
import Post from './Post'

function PostsContent() {
  return (
   <div className="space-y-4 w-full px-2 flex flex-col gap-2">
           <Post/>
            <Post/>
            <Post/>
            <Post/>
          </div>
  )
}

export default PostsContent
