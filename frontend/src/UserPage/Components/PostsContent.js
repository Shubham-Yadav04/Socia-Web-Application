import React from 'react'
import Post from './Post'

import {useSelector} from 'react-redux'
function PostsContent() {
  const posts=useSelector(state=>state.user.posts);
  return (
   <div className="space-y-4 w-full px-2 flex flex-col gap-2 ">
          {
            posts.map((post,idx)=>(
              <Post key={idx} username={post.username} id={post.id} caption={post.caption} media={post.media} content={post.content} likes={post.likes} commentsCount={post.commentsCount} commentList={post.commentList} shares={post.shares}/>
            )
            )
          }
          </div>
  )
}

export default PostsContent
