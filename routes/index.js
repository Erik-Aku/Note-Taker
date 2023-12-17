const router = require('express').Router();

// Import our modular routers for /api-routes and /html-routes
const apiRouter = require('./api-routes');
const htmlRouter = require('./html-routes');

router.use('/api', apiRouter);
router.use('/', htmlRouter);

module.exports = router;