const router = require('express').Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const ClientSchema = require('../schema/client.schema')
const Client = mongoose.model('Client')

router.use('/adm', require('./api/adm'));

//Valided Token
router.use((req, res, next) => {

  const authHeader = req.headers.authorization;
  if(!authHeader)
  return res.status(401).send({error: 'No token provided'})

  const parts = authHeader.split(' ');

  if(!parts.length === 2)
  return res.status(401).send({error: 'Token error'});

  const [scheme, token] = parts;

  if(!/^Bearer$/i.test(scheme))
  return res.status(401).send({error: 'Token malformatted'})

  jwt.verify(token, process.env.AUTH_HASH, (err, decoded) => {
    if(err) return res.status(401).send({error: 'Token invalid'})

    req.app._id = decoded._id
    return next();
  })
})

//Valided Active Account
router.use(async (req, res, next) => {
  let client = await Client.findOne({"_id" : req.app._id})
  if(!client.active)
    return res.status(401).send({error: 'Account is not actived'})
  next()
})

router.use('/api/:token', require('./api'));

module.exports = router;
