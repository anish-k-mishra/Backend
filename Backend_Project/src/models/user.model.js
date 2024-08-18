import mongoose , {Schema} from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, //cloudinary service
        required: true,
    },
    coverImage: {
        type: String, //cloudinary service
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref: "Video", 
        }
    ],
    password: {
        type: String,
        required: [true, 'Password is required!']
    },
    refreshToken: {
        type: String
    }

}, {timestamps:true})

//encrypting the password
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10)
    next();
})  //pre hooks are mongoose middleware which enables use to perform a task just before some specified task. Here we are performing a task just before the saving of the data in the database. Middleware must have the access of next


//including some custom methods
userSchema.methods.issPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.method.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY  
        }
    )
}

export const User = mongoose.model("User", userSchema)