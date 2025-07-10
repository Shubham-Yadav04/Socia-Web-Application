import { Link } from "react-router-dom";
import {motion} from 'motion/react'
import { useState } from "react";
function NavBar() {
  const [hovered,setHovered] = useState();
  const [menu,setMenu]= useState('hidden')
const navItems = [
  { name: "About", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "Services", href: "/services" },
  { name: "History", href: "/history" },
];


const navContainerVariant = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const navItemVariant = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const handleMenuClick=()=>{
  setMenu(menu==="flex"?"hidden":"flex");
}
  return (
    <div className="w-full flex items-center gap-3 px-3 justify-between sticky top-0 z-10 h-fit py-1 backdrop-blur-sm bg-white/50">
      <div className="w-fit flex items-center ">
        <img src=" " alt=""></img>
        <span className="font-bold text-lg text-orange-500 ml-5"> Blog Aliens</span>
      </div>
      <div className="w-[80%] gap-3 md:items-center px-3 md:justify-between hidden md:flex ">
        <motion.nav
      className="relative flex flex-row gap-5 items-center justify-center text-sm font-semibold text-gray-600 hidden md:flex"
      variants={navContainerVariant}
      initial="hidden"
      animate="show"
    >
      {navItems.map((item) => (
        <motion.div
          key={item.name}
          variants={navItemVariant}
          className="relative px-2"
          onMouseEnter={() => setHovered(item.name)}
          onMouseLeave={() => setHovered(null)}
        >
          <Link href={item.href}>{item.name}</Link>

          {hovered === item.name && (
            <motion.div
              layoutId="underline"
              className="absolute left-0 right-0 h-[2px] bg-[#405c69] bottom-0 rounded-xl w-[90%] mx-auto"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
            />
          )}
        </motion.div>
      ))}
    </motion.nav>
        <div className="w-[30%] flex justify-evenly">
          <button className="sign-button text-base font-bold text-[#D7DAE0] px-2 py-1 text-center min-w-[100px] w-[20%] bg-[#405c69] rounded-xl py-1">
            Sign Up
          </button>
          <button className="sign-button text-base font-bold text-black px-2 py-1 text-center min-w-[100px] w-[20%] bg-[#C4D144] rounded-xl py-1">
            Sign In
          </button>
        </div>
      </div>
      <div className=" menu w-[20%] flex items-center justify-end md:hidden" onClick={()=>handleMenuClick()}>
        <i class="ri-menu-line menu-icon"></i>
      </div>
      <div className={`${menu} absolute right-10 top-[20px] w-[30%] px-4 py-3 bg-white/50  rounded-lg backdrop-blur md:hidden border shadow-lg shadow-gray-700 border-t-0`} >
        <nav className="flex flex-col justify-start items-center gap-1 divide-y divide-black divide-3  ">
          <Link src="#About" className="text-sm font-bold text-gray-800 w-full">About Us</Link>
          <Link src ="#contact" className="text-sm font-bold text-gray-800 w-full">Contact Us</Link>
          <Link src= "#services" className="text-sm font-bold text-gray-800 w-full">Services</Link>
          <Link src="#history"className="text-sm font-bold text-gray-800 w-full">History</Link>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
