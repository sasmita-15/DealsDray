import mongoose,{ Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const adminSchema = new Schema({
    adminName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },   
    password: {
        type: String,
        required: true,     
    },
    refershToken: {
        type: String,
    },

},{
    timestamps: true
})

adminSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 2)
    next()

})
adminSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}
adminSchema.methods.generateAccessToken = async function() {
    return jwt.sign(
        {
            _id: this._id,
            adminName: this.adminName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {  
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            
        }

    )
    
}
adminSchema.methods.generateRefreshToken = async function(){
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
export const Admin = mongoose.model("Admin",adminSchema)