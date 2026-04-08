import React from 'react'
import SideBar from './SideBar'
import AsideSection from './AsideSection'
import ProfileSection from './ProfileSection'
import { useParams } from 'react-router-dom'
function VisitProfile() {
    const {id}=useParams();
   
  return (
  <div>
    <SideBar/>
    <ProfileSection id={id}/>
    <AsideSection/>
    </div>
  )
}

export default VisitProfile