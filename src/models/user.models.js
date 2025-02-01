import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const userSChema = new Schema(
    {
        username: 
        {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },

        email:
        {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        fullname:
        {
            type: String,
            required: true,
            trim: true,
            index
        },

        avatar:
        {
            type: String, // AWS URL
            required: true
        },

        coverImage:
        {
            type: String, // AWS URL
        },
        
        watchHistory:
        [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],

        password:
        {
            type: String,
            required: [true, "Password is Required!"]
        },

        refreshToken:
        {
            type: String
        }
    },

    { timestamps: true }
)

// encryption
userSChema.pre("save", async function (next){
    
    if(!this.modified("password")) return next()

    this.password = bcrypt.hash(this.password, 10)

    next()
})

// password matching
userSChema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSChema.methods.generateAccessToken = function(){
    // short lived access JWT Token 
    
}

export const User = mongoose.model("User", userSChema)