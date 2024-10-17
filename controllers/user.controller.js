const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {}

userController.createUser = async(req,res) => {
    try {
        const {email,name,password} = req.body;
        const user = await User.findOne({email});
        if(user) {
            throw new Error("You already signed up with the email.");
        };

        //bcrypt
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        
        const newUser = new User({email,name,password:hash});
        await newUser.save();
        res.status(200).json({status:"success"});

    } catch(error) {
        res.status(400).json({status:"failed", error});
    }
};


userController.loginWithEmail = async(req,res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email}, "-createdAd -updatedAt -__v");
        if(user) {
            const isMatch = bcrypt.compareSync(password, user.password);
            if(isMatch) {
                //token
                const token = user.generateToken();
                return res.status(200).json({status:"success", user, token});
            } 
            throw new Error("Email or password are incorrect.");
        }
    } catch(error) {
        res.status(400).json({status:"failed", error});
    }
};

module.exports = userController;