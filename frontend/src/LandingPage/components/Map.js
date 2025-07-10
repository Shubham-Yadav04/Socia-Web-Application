import React from 'react'
import {motion} from 'motion/react'
function Map() {
  return (
    <div className='w-full h-[80vmin] bg-blue-100 mt-6'>
    <div className="  bg-contain bg-no-repeat bg-center w-full h-full border-none shadow-xl" style={{
      backgroundImage: `url(${"/images/millions-map_2x.png"})`
    }}>
      <motion.div className='w-full h-full  bg-contain bg-no-repeat bg-center ' style={{
           backgroundImage: `url(${"/images/millions-markers_2x.png"})`
      }}
      initial={
        {
          opacity:0,
          y:-100
        }
      }
      whileInView={{
        opacity:1,
        y:0
      }}
      transition={{
        duration:0.5,
        type:"spring",
        delay:1.5,
        stiffness:50,
        damping:10
      }}
      >
      </motion.div>
    </div>
  </div>
  )
}

export default Map
