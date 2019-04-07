const router = require('express').Router();

router.use('/api/:token', require('./api'));

module.exports = router;
