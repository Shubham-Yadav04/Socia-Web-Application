import axios from 'axios'
export const follow=async(userId,profileId)=>{
   try {
    console.log("user id ",userId);
    console.log("profileId",profileId)
       const response=await axios.post(`http://localhost:8585/users/follow/${userId}`,{
profileId
       },{
              withCredentials: true
       });
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
              const response=await axios.post(`http://localhost:8585/users/unfollow/${userId}`,{
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
