import React, { useEffect } from 'react';
import axios from 'axios';
import Navbar from './Components/Navbar.js';
import SideBar from './Components/SideBar.js';
import Content from './Components/Content.js';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts, setUser } from '../context/UserSlice.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AsideSection from './Components/AsideSection.js';


export default function MainPage() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
const backendUrl=process.env.BACKEND_URL;
  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const result = await axios.get(`${backendUrl}/users/loggedInUser`, {
          withCredentials: true
        });

        if (result.status === 200) {
          dispatch(setUser(result.data.user));

          // Fetch posts after user is set
          const postsRes = await axios.get(`http://localhost:8585/users/posts/${result.data.user._id}`, {
            withCredentials: true
          });

          if (postsRes.status === 200) {
            dispatch(setPosts(postsRes.data.userPosts));
          }
        }
      } catch (error) {
        console.log("Not logged in, redirecting to login.");
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    getLoggedInUser();
  }, [dispatch, navigate]);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 flex flex-col dark:bg-gray-900 text-gray-800 dark:text-gray-100 h-screen hide-scrollbar overflow-y-scroll transition-all duration-500">
      {
        user !== null ?
          <>
            <Navbar />
            <main className="flex md:flex-row w-full relative top-[40px]">
              <SideBar />
              <Content />
             <AsideSection/>
            </main>
          </>
          :
          null
      }
    </div>
  );
}
