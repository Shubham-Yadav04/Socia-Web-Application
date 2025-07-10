import React from 'react'

function Trends() {
  return (
    <aside className="hidden lg:block w-1/4 space-y-4 md:border-l dark:border-gray-700 ">
          <div className=" flex flex-col gap-2 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg ">
            <h3 className="font-bold text-lg">Trends</h3>
            <ul className="text-sm space-y-1 font-semibold">
              <li>#TailwindCSS</li>
              <li>#Nextjs</li>
              <li>#DarkMode</li>
            </ul>
          </div>
        </aside>
  )
}

export default Trends
