import { Link, useNavigate } from "react-router-dom";
import { motion,AnimatePresence } from "motion/react";
import { useState,useEffect } from "react";
import axios from "axios" 
import { useDispatch } from "react-redux";

function NavBar() {
  const [hovered, setHovered] = useState();
  const [menu, setMenu] = useState(false);
  const [signup, setSignup] = useState(false);
  const [signin, setSignin] = useState(false);
  const [form, setForm] = useState({});
  const [formError, setFormError] = useState("");
 const navigate = useNavigate();
 const dispatch= useDispatch();
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
    setMenu(prev => !prev);
  };

  const handleSignin=async(e)=>{
    e.preventDefault()
     setFormError("")
    try{
        const result= await axios.post("http://localhost:8585/users/login",
      form,
      {
  withCredentials: true
}
    )

    
    if(result.status===200){
      console.log(result)
      setForm({})
      navigate("/dashboard")
    }
    }
    catch(error){
console.log(error)
    
  if (error.response) {
    const status = error.response.status;
    console.log(status)

    if (status === 402)  setFormError("Invalid username and password");
    if (status === 404)  setFormError("User does not exist");
  
  } else {
   
    setFormError("Something went wrong. Please try again later.");
  
  }
  setForm({})
}}
  const handleSignup=async(e)=>{
   
  e.preventDefault();
  setFormError("")
console.log("signup");
  if (form.password && form.confirmPassword) {
    if (form.password !== form.confirmPassword) {
      setFormError("Passwords do not match");
      return; 
    }
  }
  const result= await axios.post("http://localhost:8585/users/register" , form,{
  withCredentials: true
});
  console.log(result);
  if(result.status===200 && result.data){
setForm({})
navigate("/dashboard")
  }
  }
  return (
    <div className="w-full flex items-center gap-3 px-3 justify-between sticky top-0 z-20 h-fit py-1 backdrop-blur-md bg-white/50 dark:bg-[#111]/70 transition-all duration-1000">
      <div className="w-fit flex items-center ">
        <img src=" " alt=""></img>
        <span className="font-bold text-lg md:text-[2vw] text-orange-500 ml-5 dark:text-orange-700 italic">
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
        <div className="w-[30%] flex justify-end ">
          <button
            className="sign-button text-base font-bold text-black dark:text-[#D7DAE0] px-2 py-1 text-center min-w-[100px] w-[20%]  rounded-lg py-1"
            onClick={() => {
              setFormError("")
              setSignup(true)}}
          >
            Sign Up
          </button>
          <button className="sign-button text-base font-bold text-black p1 text-center min-w-[100px] w-fit bg-[#C4D144] rounded-lg" onClick={(e)=>{
            setFormError("")
            setSignin(true)}}>
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
          className="flex items-center justify-end md:hidden dark:text-white"
          onClick={() => handleMenuClick()}
        >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        </div>
      </div>
       <AnimatePresence>
  {menu && (
    <motion.div
      // Animation Settings
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      
      className="absolute right-6 top-[70px] w-[220px] z-50 overflow-hidden
                 bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl 
                 rounded-2xl border border-slate-200/50 dark:border-white/10 
                 shadow-[0_20px_50px_rgba(0,0,0,0.15)] md:hidden"
    >
      <motion.nav 
        className="flex flex-col p-2"
        initial="closed"
        animate="open"
        variants={{
          open: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
          closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
        }}
      >
        {[
          { name: 'About Us', href: '#About', icon: 'ri-information-line' },
          { name: 'Contact Us', href: '#contact', icon: 'ri-customer-service-2-line' },
          { name: 'Services', href: '#services', icon: 'ri-mickey-line' },
          { name: 'History', href: '#history', icon: 'ri-history-line' },
        ].map((item) => (
          <motion.div
            key={item.name}
            variants={{
              open: { opacity: 1, x: 0 },
              closed: { opacity: 0, x: -10 }
            }}
          >
            <Link
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-sm font-bold 
                         text-slate-700 dark:text-slate-200 rounded-xl
                         hover:bg-orange-500/10 hover:text-orange-600 
                         dark:hover:bg-orange-500/20 dark:hover:text-orange-400
                         transition-all duration-200 active:scale-95"
              onClick={() => setMenu(false)} // Close menu on click
            >
              <i className={`${item.icon} text-lg opacity-70`}></i>
              {item.name}
            </Link>
          </motion.div>
        ))}

        {/* Action buttons inside mobile menu for better UX */}
        <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-1">
           <button 
             onClick={() => { setSignin(true); setMenu(false); }}
             className="w-full text-left px-4 py-3 text-sm font-black text-orange-500 italic"
           >
             SIGN IN
           </button>
        </div>
      </motion.nav>
    </motion.div>
  )}
</AnimatePresence>
      {signup || signin ? (
        <div
          className="w-full h-screen absolute left-0 top-0 py-5 bg-white/30  "
          onClick={() => {
            console.log("clicked");
            setSignin(false);
            setSignup(false);
          }}

           initial={{ opacity: 0 }}
      animate={{ opacity: 1,
        filter:`blur-${"15px"}`
       }}
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
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-6 py-2 flex flex-col gap-1 w-full mx-auto"
              layoutId="signup-signin"
              >
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-1">
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
                    className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                    required
                    autoComplete="username"
                    value={form.username}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, username: e.target.value }))
                    }
                  />
                
                  <label
                    htmlFor="fullname"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    FullName
                  </label>
                  <input
                    id="fullname"
                    type="fullname"
                    className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                    autoComplete="fullname"
                    value={form.fullname}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, fullname: e.target.value }))
                    }
                  />
             
                
               
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
              
              
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                    autoComplete="new-password"
                    value={form.password}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, password: e.target.value }))
                    }
                  />
            
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
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
