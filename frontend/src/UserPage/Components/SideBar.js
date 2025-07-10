import { Link } from "react-router-dom";
import HomeIcon from "../svgs/HomeIcon";
import Search from "../svgs/Search";
import Message from "../svgs/Message";
import Profile from "../svgs/Profile";
import { motion } from "motion/react";
function SideBar() {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };
  const listItems = [
    { icon: <HomeIcon />, label: "Home" },
    { icon: <Search />, label: "Explore" },
    { icon: <Message />, label: "Messages" },
    { icon: <Profile />, label: "Profile" },
  ];
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex  items-end h-fit md:h-full text-base font-medium fixed bottom-0 left-0 z-10 py-1 w-full justify-evenly bg-gray-100 dark:bg-gray-900 md:border-r dark:border-gray-700
        md:w-[150px] md:space-y-4 md:flex-col md:py-5 md:pl-2 md:left-0 md:top-[44px] md:items-center md:justify-start md:gap-2"
    >
      {listItems.map((item, i) => (
        <motion.div key={i} variants={itemVariants} className="md:w-full">
          <Link href="#">
            <motion.div
              whileHover="hovered"
              className="flex p-2 md:w-full pl-4 gap-2 rounded-xl md:hover:bg-gray-300 dark:hover:bg-gray-700 "
            >
              <motion.div
                variants={{
                  hovered: { scale: 1.1 },
                  initial: { scale: 1 },
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {item.icon}
              </motion.div>

              <motion.span
                className="hidden md:flex"
                variants={{
                  hovered: { x: 5, opacity: 1 },
                  initial: { x: 0, opacity: 1 },
                }}
                transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              >
                {item.label}
              </motion.span>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default SideBar;
