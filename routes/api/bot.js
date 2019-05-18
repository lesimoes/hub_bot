const router = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Bostinho = require('../../bot/model/Bostinho.js');
const IntentSchema = require('../../schema/intent.schema');
const ClientSchema = require('../../schema/client.schema');

const Client = mongoose.model('Client');
const Intent = mongoose.model('Intent');

router.use(bodyParser.json());
router.use(async (req, res, next) => {
  const client = await Client.findOne({ _id: req.app._id }).lean();

  if (!client) return res.sendStatus(404);
  if (!req.body.message) return res.sendStatus(401);

  req.app = {
    client,
    message: req.body.message,
  };

  next();
});

router.post('', async (req, res, next) => {
  const bostinho = new Bostinho(req.app.client.intents);
  const answer = bostinho.getAnswer(req.app.message);

  res.status = 200;
  return res.send(answer);
});

module.exports = router;
