const router = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const auth = require('../../lib/auth');
const ClientSchema = require('../../schema/client.schema');

const Client = mongoose.model('Client');

const PASS = process.env.ADM_PASS;

router.use(bodyParser.json());

router.post('/auth', async (req, res, next) => {
  const { alias, password } = req.body;
  if (password !== PASS) { return res.status(401).send({ error: 'ADM password is not correct' }); }

  const client = await Client.findOne({ api_token: alias });
  const token = await auth.create(client);

  res.status(200).send({ app_token: token });
});

module.exports = router;
