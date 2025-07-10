import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar.js';
import SideBar from './Components/SideBar.js';
import Content from './Components/Content.js';
import Trends from './Components/Trends.js';
export default function MainPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (
      savedTheme === 'dark' ||
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

 const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 h-screen  hide-scrollbar overflow-y-scroll" >
     
      <Navbar onClick={toggleTheme}/>
     
      <main className="flex md:flex-row w-full  relative top-[40px]">
        {/* Sidebar */}
       <SideBar/>
        {/* Feed */}
        <Content/>

        {/* Trends / Suggestions */}
        <Trends/>
      </main>
    </div>
  );
}
