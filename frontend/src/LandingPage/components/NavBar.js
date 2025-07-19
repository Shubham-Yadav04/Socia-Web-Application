import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import {AnimatePresence} from 'motion/react'
function NavBar() {
  const [hovered, setHovered] = useState();
  const [menu, setMenu] = useState("hidden");
  const [signup, setSignup] = useState(false);
  const [signin, setSignin] = useState(false);
  const [form, setForm] = useState({});
  const [formError, setFormError] = useState("");
 
  const navItems = [
    { name: "About", href: "/about" },  
    { name: "Contact Us", href: "/contact" },
    { name: "Services", href: "/services" },
    { name: "History", href: "/history" },
  ];
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? true
      : false
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

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

  const handleMenuClick = () => {
    setMenu(menu === "flex" ? "hidden" : "flex");
  };

  const handleSignin=(e)=>{
    e.preventDefault()
    

  }
  const handleSignup=(e)=>{
   
  e.preventDefault();
console.log("signup");
  if (form.password && form.confirmPassword) {
    if (form.password !== form.confirmPassword) {
      setFormError("Passwords do not match");
      return; 
    }
  }
  }
  return (
    <div className="w-full flex items-center gap-3 px-3 justify-between sticky top-0 z-10 h-fit py-1 backdrop-blur-sm bg-white/50 dark:bg-gray-900">
      <div className="w-fit flex items-center ">
        <img src=" " alt=""></img>
        <span className="font-bold text-[2vw] text-orange-500 ml-5 dark:text-orange-700 italic">
          SOCIA
        </span>
      </div>
      <div className="w-[80%] gap-2 md:items-center px-3 md:justify-between hidden md:flex ">
        <motion.nav
          className="relative flex flex-row gap-1 items-center justify-center text-sm font-semibold text-gray-600 hidden md:flex dark:text-white/80"
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
                  className="absolute left-0 right-0 h-[2px] bg-[#405c69] bottom-0 rounded-xl w-[90%] mx-auto dark:bg-white/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                />
              )}
            </motion.div>
          ))}
        </motion.nav>
        <div className="w-[30%] flex justify-evenly">
          <button
            className="sign-button text-base font-bold text-[#D7DAE0] px-2 py-1 text-center min-w-[100px] w-[20%] bg-[#405c69] rounded-lg py-1"
            onClick={() => setSignup(true)}
          >
            Sign Up
          </button>
          <button className="sign-button text-base font-bold text-black px-2 py-1 text-center min-w-[100px] w-[20%] bg-[#C4D144] rounded-lg py-1" onClick={(e)=>setSignin(true)}>
            Sign In
          </button>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div
          className="w-fit flex gap-1 items-center justify-center dark:gap-2 "
          onClick={toggleTheme}
        >
          <div className="w-6 h-3 md:w-12  md:h-6 relative flex items-center justify-between p-1 bg-gray-500 rounded-full border dark:border-0 ">
            <div className="w-[50%] h-full rounded-full bg-white dark:hidden flex absolute top-0 left-0 " />
            <div className="w-[50%] h-full rounded-full bg-gray-800 dark:flex hidden absolute top-0 -right-0.5 " />
          </div>
        </div>
        <span className=" text-xs md:text-sm text-black font-bold dark:text-white">
          {darkMode ? "Dark" : "Light"}
        </span>

        <div
          className=" menu w-[20%] flex items-center justify-end md:hidden dark:text-white"
          onClick={() => handleMenuClick()}
        >
          <i class="ri-menu-line menu-icon"></i>
        </div>
      </div>
      <div
        className={`${menu} absolute right-10 top-[20px] w-[30%] px-4 py-3 bg-white/50  rounded-lg backdrop-blur md:hidden border shadow-lg shadow-gray-700 border-t-0`}
      >
        <nav className="flex flex-col justify-start items-center gap-1 divide-y divide-black divide-3  ">
          <Link src="#About" className="text-sm font-bold text-gray-800 w-full">
            About Us
          </Link>
          <Link
            src="#contact"
            className="text-sm font-bold text-gray-800 w-full"
          >
            Contact Us
          </Link>
          <Link
            src="#services"
            className="text-sm font-bold text-gray-800 w-full"
          >
            Services
          </Link>
          <Link
            src="#history"
            className="text-sm font-bold text-gray-800 w-full"
          >
            History
          </Link>
        </nav>
      </div>
      
      {signup || signin ? (
        <div
          className="w-full h-screen absolute left-0 top-0 py-5 bg-white/30  "
          onClick={() => {
            console.log("clicked");
            setSignin(false);
            setSignup(false);
          }}

           initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0,
       
       }}
        >
         
           <motion.div className=" mx-auto w-[300px] md:w-[500px] flex flex-col h-fit p-4 z-10"
            onClick={(e) => e.stopPropagation()}
            initial={{
              scale:0.5,
              opacity:0.5
            }}
            animate={{
              scale:1,
              opacity:1,
              transition:{
                duration:0.5
              }

            }}
            exit={{
  scale:0.5,
              opacity:0.5,
              transition: { duration: 0.5 } 
}}
           >
          {signup && (
           
              <motion.form
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-6 py-2 flex flex-col gap-2 w-full mx-auto"
              layoutId="signup-signin"
              >
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
                  Sign Up
                </h2>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="username"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                    autoComplete="username"
                    value={form.username}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, username: e.target.value }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                    autoComplete="new-password"
                    value={form.password}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, password: e.target.value }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                    autoComplete="new-password"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                  />
                </div>
                <div
                  id="signup-error"
                  className="text-red-500 text-xs min-h-[1.5em] w-full text-center"
                >
                  {form.password !== form.confirmPassword ? formError :""}
                </div>
                <button
                  
                  className="w-full py-2 mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded transition-colors z-20"
                  onClick={handleSignup}
                >
                  Sign Up
                </button>
                <div className="text-center mt-2 flex gap-1 justify-center">
                  <span className="text-gray-500 dark:text-gray-200 text-sm w-fit italic underline">
                    Already have an account?
                  </span>
                  <a
                    href="/"
                    className="text-orange-600 dark:text-orange-400 font-semibold hover:underline text-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      setSignup(false);
                      setSignin(true);
                    }}
                  >
                    Sign In
                  </a>
                </div>
              </motion.form>
           
          )}
          {
            signin &&
              <motion.form
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-6 py-2 flex flex-col gap-2 w-full mx-auto"
                onClick={e => e.stopPropagation()}
                layoutId="signup-signin"

              >
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
                  Sign In
                </h2>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="signin-username"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                    
                  >
                    Username
                  </label>
                  <input
                    id="signin-username"
                    type="text"
                    className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                    autoComplete="username"
                    value={form.username}
                    onChange={e =>
                      setForm(prev => ({ ...prev, username: e.target.value }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="signin-password"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Password
                  </label>
                  <input
                    id="signin-password"
                    type="password"
                    className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                    autoComplete="current-password"
                    value={form.password}
                    onChange={e =>
                      setForm(prev => ({ ...prev, password: e.target.value }))
                    }
                  />
                </div>
                <span className="text-xs text-red-500 w-full text-center">{formError}</span>
                <button
                  type="submit"
                  className="w-full py-2 mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded transition-colors"
                  onClick={handleSignin}
                >
                  Sign In
                </button>
                <div className="text-center mt-2 flex gap-1 justify-center">
                  <span className="text-gray-500 dark:text-gray-200 text-sm w-fit italic underline">
                    New user?
                  </span>
                  <a
                    href="/"
                    className="text-orange-600 dark:text-orange-400 font-semibold hover:underline text-sm"
                    onClick={e => {
                      e.preventDefault();
                      setSignin(false);
                      setSignup(true);
                    }}
                  >
                    Create Account
                  </a>
                </div>
              </motion.form>

          
          }
          </motion.div>
         
        </div>
      ) : (
        <></>
      )}

     
    </div>

    
  );
}

export default NavBar;
