
import {motion} from 'motion/react'

function Section1() {
  

  return (
   <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[#111] px-6 md:px-20 py-20">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-30 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ff9f1c 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-orange-400/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center gap-12">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 space-y-6 text-center md:text-left"
        >
          <div className="inline-block py-1 px-3 rounded-full bg-orange-100 dark:bg-orange-900/30">
            <h5 className="text-orange-600 dark:text-orange-400 text-xs md:text-sm font-bold tracking-widest uppercase">
               Social Alien's Community
            </h5>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Explore and Learn <br /> 
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
              In Community
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
            A social space where ideas come alive. Join a vibrant ecosystem of creators and learners 
            sharing insights on technology, lifestyle, and personal growth.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center md:justify-start">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 px-8 py-4 bg-[#ff9f1c] text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-600"
            >
              Get Started
              <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1"></i>
            </motion.button>
            
            <p className="text-sm font-medium text-slate-500 dark:text-slate-500">
              Start your journey today
            </p>
          </div>
        </motion.div>

        {/* Visual Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full md:w-1/2 relative"
        >
          <div className="relative z-20 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl">
            <motion.img 
              src="\images\social-media-social-networking-technology-connection-concept-73271333.webp" 
              alt="Community Connection"
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              
            />
          </div>
          
          {/* Floating Decorative Card */}
          <div className="absolute -bottom-6 -left-2 md:-left-6 z-30 bg-white dark:bg-slate-900 p-2 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800  md:block">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                <i className="ri-user-add-line"></i>
              </div>
              <div>
                <p className="text-xs font-bold dark:text-white">Active Members</p>
                <p className="text-xs text-slate-500">1.2k+ Joined Today</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
        
  )
}

export default Section1
