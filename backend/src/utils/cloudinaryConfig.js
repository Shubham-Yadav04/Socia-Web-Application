import { v2 as cloudinary } from 'cloudinary';
import {v4 as uuid} from 'uuid'
import "dotenv/config"
import fs from 'fs'
    // Configuration
    cloudinary.config({ 
        cloud_name: 'dixgxgkxp', 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });
    
    // Upload an image
    export const uploadFileAsync= async (localFilePath)=>{

    try{
        const uploadResult = await cloudinary.uploader
        .upload(
            localFilePath, {
                public_id: uuid(),
                resource_type:"auto"
            }
        )
        console.log("file got uploaded in the location" , uploadResult)
        return uploadResult
    }
  catch(error){
 fs.unlinkSync(localFilePath)
    console.log(error);
    throw error;
  } 
    }




export const deleteFileFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log("File deleted from Cloudinary:", result);
        return result;
    } catch (error) {
        console.error("Error deleting file from Cloudinary:", error);
        throw error;
    }
};