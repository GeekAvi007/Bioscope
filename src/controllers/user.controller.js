import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary }


const registerUser = asyncHandler( async(req, res) => {
    const {fullName, email, username, password } = req.body

    // validation
    if([fullName, username, email, password].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All Fields are Required")
    }
    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username exists!")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar File is Missing")
    }
})

export {
    registerUser
}