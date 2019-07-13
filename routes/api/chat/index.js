const router = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Bostinho = require('../../../bot/model/Bostinho.js');
const fireChat = require('../../../lib/firechat');
const socket = require('../../../socket');
const Client = mongoose.model('Client');

router.use('/bot', require('./bot'));

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.use(bodyParser.json());

router.get('/create', async (req, res, next) => {
  const account = req.app.alias;

  try {
    const result = await fireChat.create({ account });
    return res.status(200).send({ chat_id : result.id });
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get('/getQueue/:id', async (req, res, next) => {
  const account = req.app.alias;

  try {
    const result = await fireChat.getQueue({ account, queue: req.params.id });
    result.forEach(function(snap) {
        let userStatus = snap.val();
        if(userStatus.state == "online" ){
          return res.status(200).send({ status : 'online' });
        }
    });
    return res.status(200).send({ status : 'offline' });
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const account = req.app.alias;
  try {
    const result = await fireChat.getMessages({ account, key: req.params.id });

    res.status(200).send({ data: JSON.stringify(result) });
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get('/last/:id', async (req, res, next) => {
  const account = req.app.alias;
  try {
    const result = await fireChat.getLastMessage({
      account,
      key: req.params.id,
    });
    res.status(200).send({ data: JSON.stringify(result) });
  } catch (error) {
    console.log(error)
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
    console.log(socket)
    socket.test(req.body.message);
    return res.status(200).send({ status: 'Messagesss sent successfully!' });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

module.exports = router;
