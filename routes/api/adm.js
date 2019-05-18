const router = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ClientSchema = require('../../schema/client.schema');

const Client = mongoose.model('Client');
const jwt = require('jsonwebtoken');

router.use(bodyParser.json());

router.post('/auth', async (req, res, next) => {
  const { alias, password } = req.body;
  if (password !== process.env.ADM_PASS) { return res.status(401).send({ error: 'ADM password is not correct' }); }

  const client = await Client.findOne({ api_token: alias });
  const token = jwt.sign({ _id: client._id }, process.env.AUTH_HASH, {
    expiresIn: 86400,
  });

  res.status(200).send({ app_token: token });
});

module.exports = router;
