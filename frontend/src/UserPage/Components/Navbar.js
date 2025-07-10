
import {motion} from "motion/react"
function Navbar(props) {
  const darkMode= localStorage.getItem('theme')||  window.matchMedia('(prefers-color-scheme: dark)').matches;
  console.log(darkMode)
  return (
    <nav className="flex w-full h-[40px] justify-between items-center px-4 py-2 border-b  dark:border-gray-700 shadow-light fixed top-0 left-0 z-10 bg-gray-100 dark:bg-gray-900">
        <h1 className="text-xl font-bold pl-5 ">SocialApp</h1>
      <div className="w-fit flex gap-1 items-center justify-center dark:gap-2 " onClick={props.onClick}>
        <div className="w-12  h-6 relative flex items-center justify-between p-1 bg-gray-500 dark:bg-blue-600 rounded-full border dark:border-0 ">
        <div className="w-[50%] h-full rounded-full bg-white dark:hidden flex absolute top-0 left-0 border "
       
        />
<div className="w-[50%] h-full rounded-full bg-gray-800 dark:flex hidden absolute top-0 -right-0.5 "

/>
</div>
<span className="text-sm text-black font-bold dark:text-white">{darkMode==='dark'? "Dark":"Light"}</span>
      </div>
      </nav>

  )
}

export default Navbar
