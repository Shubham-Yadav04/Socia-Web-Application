import React from 'react'
import Post from './Post'
import axios from 'axios';
import { useEffect,useState } from 'react';
function PostsContent() {
 const [randomPosts,setRandomPosts]=useState([]);
 const [error,setError]=useState(false);
  useEffect(()=>{
    const getRandomPosts=async()=>{
      
      try{
const result= await axios.get('http://localhost:8585/post/random',{
        withCredentials:true
      })
      
      if(result.status===200){
       console.log("random posts ",result.data.randomPosts)
        setRandomPosts(result.data.randomPosts);
       
      }
      }
      catch(error){
        console.log("error occured ")
        setError(true);
      }
    }
    getRandomPosts();
  },[]);

  const defalut_content = [
    {
      user: {
        username: "Aaidyy",
        date: "23-11-2022",
        avatar: "https://i.pravatar.cc/150?img=3"
      },
      textContent: "afaifakaiufanaifja",
      media: [
        { type: "image", url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&q=80" }
      ],
      comments: [
        {
          id: 1,
          user: { username: "johndoe", avatar: "https://i.pravatar.cc/150?img=5" },
          text: "Nice shot!",
          media: [
            { type: "image", url: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&q=80" }
          ],
          date: "24-11-2022"
        }
      ]
    },
    {
      user: {
        username: "marie",
        date: "02-03-2023",
        avatar: "https://i.pravatar.cc/150?img=12"
      },
      textContent: "Exploring the city today — love the light here.",
      media: [
        { type: "image", url: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=800&q=80" },
        { type: "image", url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80" }
      ],
      comments: [
        {
          id: 2,
          user: { username: "alex", avatar: "https://i.pravatar.cc/150?img=7" },
          text: "Stunning views!",
          date: "02-03-2023"
        },
        {
          id: 3,
          user: { username: "sara", avatar: "https://i.pravatar.cc/150?img=8" },
          text: "Which camera did you use?",
          date: "02-03-2023"
        }
      ]
    },
    {
      user: {
        username: "kevin",
        date: "15-07-2024",
        avatar: "https://i.pravatar.cc/150?img=21"
      },
      textContent: "Quick clip from yesterday's hike. The waterfall was incredible.",
      media: [
        { type: "video", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" }
      ],
      comments: [
        {
          id: 4,
          user: { username: "linda", avatar: "https://i.pravatar.cc/150?img=14" },
          text: "Amazing! I want to go there.",
          date: "15-07-2024"
        }
      ]
    },
    {
      user: {
        username: "sam",
        date: "01-10-2024",
        avatar: "https://i.pravatar.cc/150?img=30"
      },
      textContent: "Throwback to last summer — coffee and sunsets.",
      media: [
        { type: "image", url: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=800&q=80" }
      ],
      comments: [
        {
          id: 5,
          user: { username: "nina", avatar: "https://i.pravatar.cc/150?img=18" },
          text: "So cozy!",
          date: "02-10-2024"
        },
        {
          id: 6,
          user: { username: "tom", avatar: "https://i.pravatar.cc/150?img=25" },
          text: "Where is this place?",
          date: "03-10-2024"
        }
      ]
    }
  ];
  
  // yha pr to random posts lanni padegi 
  return (
   <div className="space-y-4 w-full px-2 flex flex-col gap-2 ">
          {
            randomPosts.length>0?randomPosts:defalut_content.map((post,idx)=>(
              <Post key={idx} post={post}/>
            )
            )
          }
          </div>
  )
}

export default PostsContent
