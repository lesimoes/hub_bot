const admin = require('firebase-admin');
const router = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Bostinho = require('../../../bot/model/Bostinho.js');
const fireChat = require('../../../lib/firechat');

const IntentSchema = require('../../../schema/intent.schema');
const ClientSchema = require('../../../schema/client.schema');

const Client = mongoose.model('Client');
const Intent = mongoose.model('Intent');

router.use('/bot', require('./bot'));

const serviceAccount = require('../../../multihub-5b105-aecec3c7ef9b.json');

router.use(bodyParser.json());

router.get('/create', async (req, res, next) => {
  const account = req.app.alias;

  try {
    const result = await fireChat.create({ account });
    return result;
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post('/sendMsg/:id', async (req, res, next) => {
  const account = req.app.alias;
  try {
    const client = await Client.findOne({ _id: req.app._id }).lean();

    req.app = {
      client,
      message: req.body.message,
    };

    const result = await fireChat.getValue({ account, key: req.params.id });

    fireChat.sendMsg({
      account,
      key: req.params.id,
      message: req.body.message,
      role: req.body.role,
    });

    if (result.data().bot) {
      const bostinho = new Bostinho(req.app.client.intents);
      const answer = bostinho.getAnswer(req.app.message);
      fireChat.sendMsg({
        account,
        key: req.params.id,
        message: answer[0],
        role: 'bot',
      });
    }

    return res.status(200).send({ status: 'Messagesss sent successfully!' });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

module.exports = router;