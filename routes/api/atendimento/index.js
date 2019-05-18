const router = require('express').Router();

router.use('/bot', require('./bot'));

router.use((req, res, next) => {

});

module.exports = router;
