const router = require('express').Router();

require('./auth')(router);

module.exports = router;