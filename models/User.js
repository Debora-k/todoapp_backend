const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = Schema({
    name:{
        type:String,
        reuqired:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestampes:true});

// every time delete _doc and password while sending the json to frontend
userSchema.methods.toJSON = function () {
    const obj= this._doc;
    delete obj.password;
    delete obj.updatedAt;
    delete obj.__v;
    return obj;
};

//token
userSchema.methods.generateToken = function() {
    const token = jwt.sign({_id:this._id}, JWT_SECRET_KEY, {expiresIn:'1d'});
    return token; // to use this token
}

const User = mongoose.model("User", userSchema);
module.exports = User;