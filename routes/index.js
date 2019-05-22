const router = require('express').Router();
const mongoose = require('mongoose');
const auth = require('../lib/auth');
const ClientSchema = require('../schema/client.schema');

const Client = mongoose.model('Client');

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.use('/adm', require('./api/adm'));

// Valided Token
router.use(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) { return res.status(401).send({ error: 'No token provided' }); }

  const parts = authHeader.split(' ');

  if (!parts.length === 2) { return res.status(401).send({ error: 'Token error' }); }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) { return res.status(401).send({ error: 'Token malformatted' }); }

  try {
    const result = await auth.validate(token);
    req.app._id = result._id;
    req.app.alias = result.alias;
    req.app.result = result;
    return next();
  } catch (e) {
    return res.status(401).send({ error: 'Token invalid' });
  }
});

// Valided Active Account
router.use(async (req, res, next) => {
  const client = await Client.findOne({ _id: req.app._id });
  if (!client.active) { return res.status(401).send({ error: 'Account is not actived' }); }
  next();
});

router.use('/api/:token', require('./api'));

module.exports = router;
