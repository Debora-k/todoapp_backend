const authController = {}
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

authController.authenticate = (req, res, next) => {
    try{
        // from headers, authorization 
        const tokenString = req.headers.authorization;
        if (!tokenString) {
            throw new Error("Invalid token");
        } 
        // need to delete "Bearer " to empty string
        const token = tokenString.replace("Bearer ", "");
        jwt.verify(token, JWT_SECRET_KEY, (error, payload)=> {
            if(error){
                throw new Error("Invalid token");
            }

            req.userId = payload._id; //sending _id to next
        });
        next(); // middleware:the next function is userController.getUser in user.api.js
    } catch(error) {
        res.status(400).json({status:"failed", message:error.message});
    }
    
};

module.exports= authController;