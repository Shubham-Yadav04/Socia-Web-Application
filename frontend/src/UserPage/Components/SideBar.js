import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "../svgs/HomeIcon";
import Search from "../svgs/Search";
import Message from "../svgs/Message";
import Profile from "../svgs/Profile";
import { motion } from "motion/react";
import AddPost from "../svgs/AddPost";
import useContentContext from "../../context/ContentContext";
import Setting from "../svgs/Setting";
import Logout from "../svgs/Logout";
import { logout } from "../Functions/Logout";
function SideBar() {
  const { setView ,setAsideView} = useContentContext();
  const navigate=useNavigate();
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
    { icon: <HomeIcon />, label: "Home", handleClick: () => setView(1) },
    { icon: <Search />, label: "Explore", handleClick: () => setView(2) },
    { icon: <AddPost />, label: "Post", handleClick: () => setView(3) },
    { icon: <Message />, label: "Messages", handleClick: () => setAsideView(2) },
    { icon: <Profile />, label: "Profile", handleClick: () => setView(5) },
  ];
  return (
    <div className="w-full md:w-fit h-fit md:h-[93%] flex md:flex-col md:justify-between md:border-r dark:border-gray-700 fixed bottom-0 z-20 md:left-0 md:top-[44px] md:pb-5">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex  items-center h-fit md:h-fit text-base font-medium  z-10 py-1 w-full justify-evenly bg-gray-100 dark:bg-gray-900
        md:w-[150px] md:space-y-4 md:flex-col md:py-5 md:pl-2  md:items-center md:justify-start md:gap-1"
      >
        {listItems.map((item, i) => (
          <motion.div key={i} variants={itemVariants} className="md:w-full ">
            <Link href="#">
              <motion.div
                whileHover="hovered"
                className="flex p-2 md:w-full  gap-2 rounded-xl md:hover:bg-gray-300 dark:hover:bg-gray-700 flex justify-start "
                onClick={item.handleClick}
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
                  transition={{
                    type: "tween",
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                >
                  {item.label}
                </motion.span>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
      <div className="hidden md:flex-col md:flex gap-1">
        <motion.div variants={itemVariants} className="md:w-full ">
          <button
            className="flex p-2 md:w-full pl-4 gap-2 rounded-xl md:hover:bg-gray-300 dark:hover:bg-gray-700"
            onClick={() => setAsideView(3)}
            type="button"
          >
            <motion.div
              variants={{
                hovered: { scale: 1.1 },
                initial: { scale: 1 },
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Settings SVG */}
              <Setting/>
            </motion.div>
            <motion.span
              className="hidden md:flex"
              variants={{
                hovered: { x: 5, opacity: 1 },
                initial: { x: 0, opacity: 1 },
              }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            >
              Settings
            </motion.span>
          </button>
        </motion.div>
        <motion.div variants={itemVariants} className="md:w-full md:flex ">
          <button
            className="flex p-2 md:w-full pl-4 gap-2 rounded-xl md:hover:bg-red-300 dark:hover:bg-red-700"
            onClick={async() => {
              alert("are you sure you want to logout ")
             try {
              const result=await logout();
              console.log(result)
              if (result===200) navigate('/');
             } catch (error) {
              alert("some error occured try again");
             }
            }}
            type="button"
          >
            <motion.div
              variants={{
                hovered: { scale: 1.1 },
                initial: { scale: 1 },
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Logout SVG */}
              <Logout />
            </motion.div>
            <motion.span
              className="hidden md:flex"
              variants={{
                hovered: { x: 5, opacity: 1 },
                initial: { x: 0, opacity: 1 },
              }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            >
              Logout
            </motion.span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default SideBar;
