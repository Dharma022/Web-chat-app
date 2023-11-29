const app = require('express').Router();

module.exports = (function () {
    //admin route
    const authRoutes = require('./admin/router');
    app.use('/auth', authRoutes);

    //user route
    const userRoutes = require('./user/router');
    app.use('/messages',userRoutes);

    //customers
    const customerRoutes = require('./customer/router');
    app.use('/customer', customerRoutes);
    
    return app;
})();