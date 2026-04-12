
import NavBar from './components/NavBar.js'
import './Home.css';
import Section1 from './components/Section1.js';
import Section2 from './components/Section2.js';
import Map from './components/Map.js'
import Section3 from './components/Section3.js';
import Footer from './components/Footer.js';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Home() {
 const navigate= useNavigate()
 const backendUrl=process.env.BACKEND_URL;
  useEffect(()=>{
    const isLogin=async()=>{
      try{
 const result = await axios.get(`${backendUrl}/users/loggedInUser`, {
          withCredentials: true
        });

        if (result.status === 200) {
          navigate('/dashboard')
        }
      }
      catch(error){
        console.log("")
      }
    }
    isLogin()
  },[])
  return (
    <div className='relative w-full bg-white/80 dark:bg-[#111] transition-all duration-1000 '>
      
        <NavBar  />
     
      <Section1 />
      <Section2 />
      <Section3 />
      <Map />
      <Footer/>
    </div>
  )
}

export default Home
