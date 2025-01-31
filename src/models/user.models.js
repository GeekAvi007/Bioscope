import mongoose, { Schema } from "mongoose"

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

export const User = mongoose.model("User", userSChema)