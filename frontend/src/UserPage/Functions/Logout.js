import axios from 'axios'
export const logout=async()=>{
try {
    const result=await axios.get("http://localhost:8585/users/logout",{
         withCredentials:true
    })
   
  if(result.status===200) return 200;
  
} catch (error) {
    console.log(error);
    return 0;
}
}