import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice.js';
const contextStore = configureStore({
   reducer:{
    user:userReducer
   }
})

export default contextStore;