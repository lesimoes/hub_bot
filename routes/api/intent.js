const router = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const IntentSchema = require('../../schema/intent.schema')
const ClientSchema = require('../../schema/client.schema')

const Client = mongoose.model('Client')
const Intent = mongoose.model('Intent');

router.use(bodyParser.json())

router.use(async (req, res, next) => {

  let client = await Client.findOne({"_id" : req.app._id})

  req.app = {
    client: client
  }

  if(!client) return res.sendStatus(404)

  next();
})

router.get('/list', async (req, res, next) => {

  return res.send(req.app.client.intents)
})

router.post('/new_intent', async (req, res, next) => {

  req.app.client.intents.push(req.body)
  req.app.client.save()
  return res.sendStatus(201)

})

module.exports = router;
