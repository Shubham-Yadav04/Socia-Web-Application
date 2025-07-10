
import {motion} from 'motion/react'

function Section1() {
  

  return (
    <section className='w-full gap-3 px-4 min-h-[90vh] h-fit mt-5 overflow-x-hidden md:px-20 md:mt-10'>
    <div className='w-full flex flex-col md:flex-row items-center justify-center h-full gap-5 '>
    <div className=' section1-text-container w-full p-5 md:p-0 md:w-[50%] flex flex-col justify-center h-full gap-2 md:pt-5'>
        <h5 className='text-red-700 text-sm font-bold'> Alien's-Community  </h5>
        <h1 className=' text-[4vw] font-bold italic text-gray-700'>
            Explore And Learn In Community
        </h1>
        <p className='text-gray-500 md:text-sm text-xs text-justify  '>
        Social space where ideas come alive! Here, you'll find engaging content on a variety of topics, from technology and lifestyle to travel and personal growth. Our goal is to inspire, inform, and connect with readers through thoughtful articles, creative insights, and practical tips. Whether you're looking to learn something new, find motivation, or simply enjoy a good read, there's something here for everyone to share and learn.
        </p>
       <div className='w-full flex items-center justify-center'>

        <button className='section1-text-container-button flex items-center text-base font-bold px-2 bg-[#ff9f1c] border rounded-lg  text-white'>Get Started <i className="ri-arrow-right-line pt-1 text-orange-700 w-[2vw] text-lg  "></i></button>
       </div>
      <p className='w-full text-sm font-semibold text-gray-600 section1-last-para'>Let's Start a new Journey Of Knowledge and Interest</p>
    
    </div>
    <motion.div className='md:w-[45%] w-full flex items-center justify-center  h-[100%] p-5 border border-2 border-gray-200 rounded-xl relative  shadow-lg'
    style={{ perspective: 800 }}
    initial={{
      y:-500,
opacity:0,
scale:0.8
    }}
    animate={{
      y:0,
      opacity:1,
      scale:1
    }}
    transition={{
      duration:0.5,
      when:"beforeChildren"
    }}
        >
      <motion.img src='\images\social-media-social-networking-technology-connection-concept-73271333.webp' alt=" unavailable"  className='w-full h-full object-cover z-20' 
      initial={{
        x:500,
        opacity:0,
        scale:0.6
      }}
      animate={{
        x:0,
        opacity:1,
        scale:1
      }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}

    />
    </motion.div>
    </div>
        </section>
        
  )
}

export default Section1
