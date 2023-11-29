const User = require('./../Models/user.model');

const getUsersForSidebar = async (req,res) => {
    try {
        const loggedInUserId = req.user._id;
        //last part in getting users with find method makes sure that it doesn't find the user whose account is this.
        const allUsers = await User.find({ _id : { $ne : loggedInUserId }}).select('-password'); 
        res.status(200).json(allUsers);

    } catch (error) {
        console.log("error in getting users for sidebar", error.message);
        res.status(500).json({error : "Internal server error."});
    }

}

module.exports = {
    getUsersForSidebar
}