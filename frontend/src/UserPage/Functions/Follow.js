import axios from 'axios'
const backendUrl=process.env.BACKEND_URL;
export const follow=async(userId,profileId)=>{
   try {
    console.log("user id ",userId);
    console.log("profileId",profileId)
       const response=await axios.post(`${backendUrl}/users/follow/${userId}`,{
profileId
       },{
              withCredentials: true
       });
       console.log("follow response",response);
       return response.status;
   } catch (error) {
       console.error("Error following user:", error);
       throw error;
   }
}

export const unfollow=async(userId,profileId)=>{
    try {
     console.log("user id ",userId);
       console.log("profileId",profileId)
              const response=await axios.post(`${backendUrl}/users/unfollow/${userId}`,{
       profileId     
              },{
                     withCredentials: true
              });
              return response.status;
          } catch (error) {                
              console.error("Error unfollowing user:", error);
              throw error;
          }
       }
