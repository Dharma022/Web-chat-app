const userController = require('./../../Controllers/user.Controller');
const protectRoute = require('./../../middleware/protectRoute');

module.exports = function(router) {
    //api for sending the message in which user id is of the sender
    router.post('/send/:id', protectRoute,userController.sendMessage);
    //api for getting the messages for a perticular user to show
    router.get('/:id', protectRoute, userController.getMessages);
}