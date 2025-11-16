import { createContext, useContext } from "react";
import { useState } from "react";
const ContentContext= createContext();

export const ContentContextProvider=({children})=>{
    const [view,setView]= useState(1);
    const [asideView,setAsideView]= useState(0);
    const [viewProfile,setViewProfile]=useState(false)
    const [profileMenu,setProfileMenu]= useState(false);
    const [profilePreview,setProfilePreview]=useState(null);
    return(
        <ContentContext.Provider value={{view,setView,asideView,setAsideView,viewProfile,setViewProfile,profileMenu,setProfileMenu,profilePreview,setProfilePreview}}>
        {children}
        </ContentContext.Provider>
    )
}
const useContentContext= ()=>useContext(ContentContext);
export default useContentContext;