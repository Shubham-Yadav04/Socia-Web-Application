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
        addPost:(state,action)=>{
state.posts.push(action.payload)
        },// add the post in the posts and the components using the post will rerender 
        deletePost:(state,action)=>{
            console.log(action.payload)
            state.posts=state.posts.filter((post)=>post.id!==action.payload.id)
        },
        upadatePost:(state,action)=>{
            const index=state.posts.findIndex((post)=>post.id===action.payload.id)
            if(index!==-1){
                state.posts[index]=action.payload
            }
        }
    }


})

export const {setUser,addPost,deletePost,upadatePost}=UserSlice.actions;
export default UserSlice.reducer;