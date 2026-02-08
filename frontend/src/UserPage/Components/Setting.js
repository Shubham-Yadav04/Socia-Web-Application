import React from 'react'
import { motion } from "motion/react";
import Logout from '../svgs/Logout';
import { logout } from '../Functions/Logout';
import { useNavigate } from 'react-router-dom';
function Setting() {
  const navigate=useNavigate();
  return (
    <div className='h-full w-full flex flex-col  '>
        <h1 className='text-xl font-bold p-3'>Settings</h1>
        <motion.div className="flex w-full text-red-500 md:w-full md:hidden ">
          <button
            className="flex p-2 md:w-full pl-4 gap-2 rounded-xl md:hover:bg-red-300 dark:hover:bg-red-700"
            onClick={async() => {
              alert("are you sure you want to logout ")
             try {
              const result=await logout();
              console.log(result)
              if (result===200) navigate('/');
             } catch (error) {
              alert("some error occured try again");
             }
            }}
            type="button"
          >
            <motion.div
             
            >
              {/* Logout SVG */}
              <Logout />
            </motion.div>
            <motion.span
              className="md:flex"
            >
              Logout
            </motion.span>
          </button>
        </motion.div>
        <h1 className="p-3"> to be updateddd ....</h1>
    </div>
  )
}

export default Setting
