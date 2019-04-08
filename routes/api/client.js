const router = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ClientSchema = require('../../schema/client.schema')
const Client = mongoose.model('Client')
const jwt = require('jsonwebtoken')

router.use(bodyParser.json())

router.use(async (req, res, next) => {
  let client = await Client.findOne({"_id" : req.app._id}).select(['+pass', '+user'])

  req.app = {
    token: token,
    client: client
  }

  if(!client) return res.sendStatus(404)

  next();
})

router.get('/:id', (req, res, next) => {
  res.send(req.params)
  res.status = 200
})



module.exports = router;
