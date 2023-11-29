const generateTokenAndSetCookie = require('../utilities/GenToken');
const User = require('./../Models/user.model');
const bcryptjs = require('bcryptjs');


const signupUser = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "passwords do not match." });
        }
        // check if the User with the userdetails already exists or not
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "username already exists." })
        }

        //hash the password before saving it.
        const salt = await bcryptjs.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcryptjs.hash(password, salt);

        //setting default profile pic for boys and girls
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilepic: gender == "male" ? boyProfilePic : girlProfilePic
        })

        if (newUser) {

            //generate JWT token here
            generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();

            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                gender: newUser.gender,
                profilepic: newUser.profilepic
            })
        } else {
            res.status(400).send({error: "Invalid User data."});
        }

    } catch (error) {
        console.log("Error in Signup Controller", error.message);
        res.status(500).json({ error: "Internal server error." })
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({username});
        const passCheck = await bcryptjs.compare(password, user?.password || "");

        if(!user || !passCheck){
            res.status(400).json({error: "Invalid Username or Password."});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName : user.fullName,
            username: user.username,
            profilepic: user.profilepic
        })

    } catch (error) {
        console.log("Error in Login Controller", error.message);
        res.status(500).json({ error: "Internal server error." });
    }
}

const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge : 0 });
        res.status(200).json({ message: "Logged Out successfully." })

    } catch (error) {
        console.log("Error in Logout Controller", error.message);
        res.status(500).json({ error: "Internal server error." });        
    }
}

module.exports = {
    signupUser,
    loginUser,
    logoutUser
}
