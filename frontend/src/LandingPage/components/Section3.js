import {motion} from "motion/react"
import Features from "./Features.js";
function Section3() {
  return (
    <div className="h-fit w-full items-center  overflow-x-hidden flex flex-col gap-5 relative pt-10 ">
      <h1 className="text-[3vw] font-bold dark:text-white/90"> Key Features -</h1>
  
<div className="w-full h-fit relative px-0 overflow-hidden">
   <div className="absolute left-0 top-0 h-full w-[25px] z-20 pointer-events-none fade-left  backdrop-blur-sm" />
  <div className="absolute right-0 top-0 h-full w-[25px] z-20 pointer-events-none fade-right  backdrop-blur-sm" />

      <motion.div className="w-full h-fit flex  justify-around gap-5  "
      animate={{ x: ['0%', '-100%'] }}
       transition={{
      duration: 20, // control speed
      ease: 'linear',
      repeat: Infinity,
    }}>
     
        <Features
          heading="Article and Guide Creation:"
          imageUrl="\images\ArticlesImg.webp"
          content="Users can write detailed articles or step-by-step guides to share knowledge on their topics of interest."
        />
        <Features
          heading="Post Sharing:"
          imageUrl="\images\postSharing.jpg"
          content=" Create quick posts to share insights, ideas, or updates with the community."
        />

        <Features
          heading="Topic Diversification: "
          imageUrl="\images\diverseTopics.jpg"
          content="Supports categories like Fitness, Technology, Finance, Lifestyle, and Social Issues, enabling users to discover and contribute to their passions."
        />
        <Features
          heading="Interactive Discussions:"
          imageUrl="\images\discussion.png"
          content="Engage with others through comments, likes, and shares, promoting constructive discussions."
        />

        <Features
          heading="Community Building"
          imageUrl="\images\community.jpg"
          content="Follow like-minded individuals, join groups, or collaborate with others to form niche communities."
        />
        <Features
          heading="Personalized Feeds:"
          imageUrl="\images\personalised.jpg"
          content="An intelligent recommendation system curates content based on user interests and activity."
        />
      </motion.div>
    </div>
    </div>
  );
}

export default Section3;
