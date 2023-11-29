const jwt = require('jsonwebtoken');
const User = require('../Models/user.model');

const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error : " Unauthorized request please log in!"});
        }

        const decoded = jwt.verify(token, process.env.SECRET);

        if(!decoded){
           return res.status(401).json({error : " Unauthorized : tokens do not match!!"});
        }

        const user = await User.findById(decoded.userID).select("-password");

        if(!user){
           return res.status(404).json({error : "User not found!"});
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("Error in Middleware Route!");
        res.status(500).json({message : "Internal server error ProtectRoute!"});
    }
}

module.exports = protectRoute;