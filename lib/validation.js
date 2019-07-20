//validator.js    
const {validationResult, check} = require('express-validator');

const chatCreate = [

  check('protocol').isLength({ min: 3 }),
  check('name').isLength({ min: 1 }),
  check('email').isEmail(),
  check('reason').isLength({ min: 1 }),
  check('queue').isInt(),
  check('channel_id').isInt(),

  function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.mapped()});
    }
    next();
  },
];

module.exports = {
  chatCreate
};
