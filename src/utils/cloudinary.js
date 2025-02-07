import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import { url } from 'inspector';
import dotenv from "dotenv"

dotenv.config()

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async(localFilePath) => {
    try{
        if(!localFilePath) return null
        const response = await cloudinary.uploader
       .upload(
        localFilePath, 
            {
                resource_type: "auto"
            }
       )
       console.log("File Uploaded on Cloudinary. File Src : " +response.url);
    }catch(error){
        // once uploaded delete from server
        fs.unlinkSync(localFilePath)
        return response
    }
}

const deleteFromCloudinary = async(publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId)
        console.log("Deleted from Cloudinary. Public Id: ", publicId)
    } catch (error) {
        console.log("Error deleting from cloudinary ", error)
        return null
    }
}

export {uploadOnCloudinary, deleteFromCloudinary}