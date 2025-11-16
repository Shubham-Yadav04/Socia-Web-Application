import React from 'react'

function ChatList() {
    // i will add a chatrooms array in the user profile which will contain the chatrooms references in which the user is involved 
  return (
    <div className='h-full w-full flex flex-col px-2 py-4 space-y-4'>
        <h1 className='text-lg font-bold'>Chat Rooms</h1>
        <h1> In Progress .... Not Supported Now </h1>
        <ul className='space-y-2'>
            <li className='p-2 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition'>Chat Room 1</li>
            <li className='p-2 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition'>Chat Room 2</li>
            <li className='p-2 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition'>Chat Room 3</li>
        </ul>
    </div>
  )
}

export default ChatList
