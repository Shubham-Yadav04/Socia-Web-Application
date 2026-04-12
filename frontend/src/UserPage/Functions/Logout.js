import axios from 'axios'
const backendUrl=process.env.BACKEND_URL;
export const logout=async()=>{
try {
    const result=await axios.get(`${backendUrl}/users/logout`,{
         withCredentials:true
    })
   
  if(result.status===200) return 200;
  
} catch (error) {
    console.log(error);
    return 0;
}
}