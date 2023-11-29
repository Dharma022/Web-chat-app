const jwt = require('jsonwebtoken');


const generateTokenAndSetCookie = (userID, res) => {
    const token = jwt.sign({ userID }, process.env.SECRET, {
        expiresIn: '15d'
    })

    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,  // miliseconds
        httpOnly: true, //make cookie secure so that is it inaccessible via javascript ( prevention of cross-site attacks)
        sameSite: "strict", // CSRF attacks cross-site attacks forgery attacks
        secure: process.env.NODE_ENV !== "development"
    });
};

module.exports = generateTokenAndSetCookie;