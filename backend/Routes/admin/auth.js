const authController = require('./../../Controllers/auth.Controller')

module.exports = function(router){
    //to Sign up new user
    router.post('/signup', authController.signupUser);
    //to Log in user
    router.post('/login', authController.loginUser);
    //to log Out user
    router.post('/logout', authController.logoutUser);
}