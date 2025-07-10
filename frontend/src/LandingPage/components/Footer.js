import React from 'react'

function Footer() {
  return (
    <footer className='w-full h-fit flex flex-col gap-3 pt-6 bg-blue-100'>
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col items-center gap-3 px-4 pb-4">
            <h4 className='text-[2rem] font-bold text-shadow'>About Us</h4>
            <p className='text-sm font-semibold text-gray-600 '>
              Welcome to our community platform where people can share their experiences, knowledge, and insights on fitness, technology, finance, and more. Empowering everyone to learn, connect, and grow.
            </p>
          </div>

          <hr style={{borderColor: "#555", margin:" 20px 0;"}}/>

          
            <div style={{display:" flex",justifyContent: "space-around", flexWrap: "wrap"}}>
              <div className='flex flex-col gap-1 '>
                <h5 className='text-base font-bold'>Quick Links</h5>
                <ul style={{listStyle: "none", padding: "0", textAlign: "left"}}>
                  <li><a href="/about" className='text-sm font-semibold italic text-gray-800 underline'>About Us</a></li>
                  <li><a href="/contact"className='text-sm font-semibold italic text-gray-800 underline'>Contact</a></li>
                  <li><a href="/faq" className='text-sm font-semibold italic text-gray-800 underline'>FAQs</a></li>
                </ul>
              </div>
              <div>
                <h5 className='text-base font-bold'>Resources</h5>
                <ul style={{listStyle: "none", padding: "0", textAlign: "left"}}>
                  <li><a href="/blog" className='text-sm font-semibold italic text-gray-800 underline'>Blog</a></li>
                  <li><a href="/guides"className='text-sm font-semibold italic text-gray-800 underline'>Guides</a></li>
                  <li><a href="/terms"className='text-sm font-semibold italic text-gray-800 underline'>Terms of Service</a></li>
                </ul>
              </div>
              <div>
                <h5 className='text-base font-bold'>Follow Us</h5>
                <ul style={{listStyle: "none", padding: "0", textAlign: "left"}}>
                  <li><a href="https://facebook.com" className='text-sm font-semibold italic text-gray-800 underline'>Facebook</a></li>
                  <li><a href="https://twitter.com" className='text-sm font-semibold italic text-gray-800 underline'>Twitter</a></li>
                  <li><a href="https://linkedin.com"className='text-sm font-semibold italic text-gray-800 underline'>LinkedIn</a></li>
                </ul>
              </div>
            </div>
          

          <hr style={{borderColor: "#555", margin:" 20px 0;"}}/>

            <div className="footer-copyright text-center">
              <p className='para'>&copy; 2024 Community App. All rights reserved.</p>
              <p style={{ paddingBottom:"2rem"}}>
                <a href="/privacy" className='text-sm font-semibold italic text-gray-800  underline'>Privacy Policy</a> |
                <a href="/terms" className='text-sm font-semibold italic text-gray-800 underline'>Terms of Service</a>
              </p>
            </div>
        </div>

      </footer>
  )
}

export default Footer
