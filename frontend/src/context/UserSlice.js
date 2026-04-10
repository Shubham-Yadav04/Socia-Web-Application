import { createSlice } from "@reduxjs/toolkit";


// login krte hi user store hoga uski posts and all

const UserSlice= createSlice({
    name:"user",
    initialState:{
        user:null,
        posts:[],
        loading:false,
    },
    reducers:{
        setUser:(state,action)=>{
state.user=action.payload
        },
        setPosts:(state,action)=>{
state.posts=action.payload
        },
        addPost:(state,action)=>{
             console.log("INSIDE REDUCER", action.payload);
state.posts.push(action.payload)
        },// add the post in the posts and the components using the post will rerender 
        deletePost:(state,action)=>{
            console.log(action.payload)
            state.posts=state.posts.filter((post)=>post.id!==action.payload._id)
        },
        upadatePost:(state,action)=>{
            const index=state.posts.findIndex((post)=>post.id===action.payload._id)
            if(index!==-1){
                state.posts[index]=action.payload
            }
        }
        ,
        updateFollowers:(state,action)=>{
            state.user.followers.push(action.payload.profileId);
            
        },
         updateFollowings:(state,action)=>{
            state.user.followings.push(action.payload.profileId);
            state.user.followingCount+=1;
        },
        unfollow:(state,action)=>{
state.user.followings=state.user.followings.filter((id)=>id!==action.payload.profileId)
state.user.followingCount-=1;
        },
        updateProfilePicture:(state,action)=>{
            state.user.avatar=action.payload;
        }
    }

})

export const {setUser,addPost,deletePost,upadatePost,setPosts,updateFollowers,updateFollowings,updateProfilePicture}=UserSlice.actions;
export default UserSlice.reducer;