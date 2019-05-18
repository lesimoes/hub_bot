const router = require('express').Router();

router.use('/client', require('./client'));
router.use('/intent', require('./intent'));
router.use('/bot', require('./bot'));

router.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors, key) => {
        errors[key] = err.errors[key].message;

        return errors;
      }, {}),
    });
  }

  return next(err);
});

module.exports = router;
