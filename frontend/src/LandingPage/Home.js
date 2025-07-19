
import NavBar from './components/NavBar.js'
import './Home.css';
import Section1 from './components/Section1.js';
import Section2 from './components/Section2.js';
import Map from './components/Map.js'
import Section3 from './components/Section3.js';
import Footer from './components/Footer.js';
function Home() {
 
  return (
    <div className='relative w-full bg-white/80 dark:bg-gray-900'>
      
        <NavBar  />
     
      <Section1 />
      <Section2 />
      <Section3 />
      <Map />
      <Footer/>
    </div>
  )
}

export default Home
