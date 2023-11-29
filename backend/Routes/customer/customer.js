const { getUsersForSidebar } = require("../../Controllers/customer.Controller");
const protectRoute = require("../../middleware/protectRoute");



module.exports =function(router) {
    //to get users to show all contact lists for the side bar
    router.get('/', protectRoute, getUsersForSidebar);
}