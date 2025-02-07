import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js"
import { deleteFromCloudinary } from "../utils/cloudinary.js"

const registerUser = asyncHandler( async(req, res) => {
    const {fullname, email, username, password } = req.body

    // validation
    if([fullname, username, email, password].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All Fields are Required")
    }
    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username exists!")
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path
    const coverLocalPath = req.files?.coverImage?.[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar File is Missing")
    }

    // const avatar = await uploadOnCloudinary(avatarLocalPath)
    // let coverImage = ""
    // if(coverLocalPath){
    //     coverImage = await uploadOnCloudinary(coverImage)
    // }

    let avatar;
    try {
        avatar = await uploadOnCloudinary(avatarLocalPath)
        console.log("Uploaded Avatar", avatar)
    } catch (error) {
        console.log("Error Uploading Avatar", error);
        throw new ApiError(500, "Failed to upload avatar!")
    }

    let coverImage;
    try {
        coverImage = await uploadOnCloudinary(coverLocalPath)
        console.log("Uploaded coverImage", coverImage)
    } catch (error) {
        console.log("Error Uploading coverImage", error);
        throw new ApiError(500, "Failed to upload coverImage!")
    }

   try {
     const user = await User.create({
         fullname,
         avatar: avatar.url,
         coverImage: coverImage?.url || "",
         email,
         password,
         username: username.toLowercase()
     })
 
     const createdUser = await User.findById(user._id).select("-password -refreshToken"
 
     )
 
     if(!createdUser){
         throw new ApiError(500, "Something went wrong while registering user")
     }
 
     return res.status(201).json(new apiResponse(200, createdUser, "User registered successfully"))
   } catch (error) {
    console.log("User Creation failed!")
    if(avatar){
        await deleteFromCloudinary(avatar.public_id)
    }
    if(coverImage){
        await deleteFromCloudinary(coverImage.public_id)
    }
    throw new ApiError(500, "Something went wrong while registering a user and images were deleted")
   }
})

export {
    registerUser
}