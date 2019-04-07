const router = require('express').Router();

router.get('/:id', (req, res, next) => {
    res.send(req.params)
    res.status = 200
})

router.post('client', (req, res, next) => {

})

module.exports = router;
