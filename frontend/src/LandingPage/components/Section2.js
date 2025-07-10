import {motion,AnimatePresence} from "motion/react"

function Section2() {
const parentVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,     
      delayChildren: 0.2        
    }
  }
};


const childVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(5px)"
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};
  return (
    <div className='w-full h-fit  flex md:flex-row flex-col items-center justify-center md:px-10 '>
    <div className='w-[80%] md:w-[45%] flex justify-center items-center h-full p-4'>
      <img src='\images\sharing-removebg-preview.png' alt='enable to load'className='w-full object-cover ' />
    </div>
    <motion.div className='w-full md:w-[50%] flex flex-col gap-3 justify-center items-center  p-5 md:p-0'
    variants={parentVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }} 
    ><motion.h1
        className='text-[3vmax] font-bold'
        style={{ textShadow: "6px 2px 4px 16px rgb(0, 0, 0)" }}
        variants={childVariants}
      >
        WHY? Aliens Community
      </motion.h1>

      <motion.p
        className='text-xs md:text-sm text-gray-600 font-semibold text-justify'
        variants={childVariants}
      >
         SocialSphere is an interactive social platform designed to empower individuals to share their insights, experiences, and expertise across diverse domains. Whether it's fitness journeys, technical project development, financial strategies, or opinions on social activities, SocialSphere fosters a community of learning and growth.
      </motion.p>

      <motion.h3
        className='text-[1rem] italic font-bold underline'
        variants={childVariants}
      >
        Vision:
      </motion.h3>

      <motion.p
        className='text-xs md:text-sm text-gray-600 font-semibold text-justify'
        variants={childVariants}
      >
        SocialSphere aspires to be a go-to destination for learning, collaboration, and community engagement, bridging the gap between personal interests and collective growth.
      </motion.p>

      <motion.button
        className='w-fit p-2 bg-blue-400 mx-auto rounded-lg text-sm md:text-lg font-bold mt-5'
        variants={childVariants}
    
      >
        Start Exploring
      </motion.button>
     
    </motion.div>

  </div>
  )
}

export default Section2
