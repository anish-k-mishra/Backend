import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req, res) => {
    //get user details from the frontend
    //validation - not empty
    //check if user already exists: username, email
    //check for images, check for avatar
    //upload them to cloudunary, avatar
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return response

    // 1-> get all details
    const {fullName, email, username, password} = req.body
    console.log("email: ", email);


    //2-> Validation

    // if (fullName === "") {
    //     throw new ApiError(400, "Full name is required!")
    // } similarly we can check all the fields

    // Better way
    if (
        [fullName, email, username, password].some((field)=>
            field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required")
    }

    //3-> Check if user already exists
    
    //User that came from user.model can directly contact with the db as it is made from mongoose.model

    const existedUser = User.findOne({
        $or: [{username}, {email}] //this will check for the presence of either one of the two given fields in the db. If we would have done: User.findOne({username}), it would have searched for only username
    })

    if(existedUser){
        throw new ApiError(409, "User with give email or username already exists! ")
    }

    //4-> Check for images and avatar

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar field is required!");
    }

    //5-> upload them to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400, "Avatar field is necessary!");
    }

    //6-> create an user object: entry in db
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })


    //7-> remove password and refresh token fields from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken" //here all those fields should be mentioned which we don't need.
    )

    //8-> check for user creation
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user!")
    }

    //9-> send the response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully!")
    )


})

export {registerUser }