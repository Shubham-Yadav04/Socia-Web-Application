import React from 'react'
import ChatList from './ChatList'
import useContentContext from '../../context/ContentContext'
import Setting from './Setting'
function AsideSection() {
  const {asideView}=useContentContext()
  return (
    <div className='hidden lg:block w-1/4 space-y-4 md:border-l dark:border-gray-700'>
{
  asideView===1 && <div className='hidden md:flex md:flex-col pt-4 px-2  md:gap-4'>
    <h1 className='font-bold text-lg italic'>Trending H##h</h1>
    <ul className='space-y-1 text-xs'>
      <li className='p-2 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition'>#React</li>
      <li className='p-2 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition'>#JavaScript</li>
      <li className='p-2 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition'>#WebDevelopment</li>
    </ul>

  </div>
}
{
  asideView===2 && <ChatList/>
}
{asideView===3 && <Setting/>}
    </div>
  )
}

export default AsideSection
