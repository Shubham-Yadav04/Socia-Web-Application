import {motion} from "motion/react"
import Features from "./Features.js";
function Section3() {
  
   const featureData = [
    { heading: "Article Creation", imageUrl: "/images/ArticlesImg.webp", content: "Write detailed articles or step-by-step guides to share knowledge." },
    { heading: "Post Sharing", imageUrl: "/images/postSharing.jpg", content: "Create quick posts to share insights, ideas, or updates instantly." },
    { heading: "Topic Diversity", imageUrl: "/images/diverseTopics.jpg", content: "Categories like Fitness, Tech, and Finance to fuel your passions." },
    { heading: "Interactive Hub", imageUrl: "/images/discussion.png", content: "Engage with others through comments, likes, and shares." },
    { heading: "Community Build", imageUrl: "/images/community.jpg", content: "Follow like-minded individuals and join niche groups." },
    { heading: "Smart Feeds", imageUrl: "/images/personalised.jpg", content: "Intelligent recommendations curated just for your interests." },
  ];

  // Double the data to ensure a seamless loop
  const duplicatedFeatures = [...featureData, ...featureData];

  return (
    <section className="h-fit w-full flex flex-col gap-10 relative pt-20 pb-10 overflow-hidden bg-white dark:bg-[#111]">
      <div className="px-6 md:px-20">
        <h5 className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-2">Capabilities</h5>
        <h2 className="text-4xl md:text-5xl text-center text-black  font-black dark:text-white/90 italic">
          Key Features <span className="text-orange-500">.</span>
        </h2>
      </div>

      <div className="relative w-full flex overflow-hidden">
        {/* Superior Fade Effect using CSS Gradients */}
        <div className="absolute left-0 top-0 h-full w-[15%] z-20 pointer-events-none bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-[15%] z-20 pointer-events-none bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent" />

        <motion.div 
          className="flex gap-6 pr-6"
          animate={{ x: [0, -1600] }} // Adjust based on (card width + gap) * card count
          transition={{
            duration: 30,
            ease: 'linear',
            repeat: Infinity,
          }}
          whileHover={{ animationPlayState: 'paused' }} // Stops carousel on hover
        >
          {duplicatedFeatures.map((f, index) => (
            <Features 
              key={index}
              heading={f.heading}
              imageUrl={f.imageUrl}
              content={f.content}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Section3;
