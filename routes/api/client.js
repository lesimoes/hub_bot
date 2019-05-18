const router = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const ClientSchema = require('../../schema/client.schema');

const Client = mongoose.model('Client');

router.use(bodyParser.json());

router.use(async (req, res, next) => {
  const client = await Client.findOne({ _id: req.app._id }).select(['+pass', '+user']);
  req.app = {
    token,
    client,
  };

  if (!client) return res.sendStatus(404);

  next();
});

router.get('/:id', (req, res, next) => {
  res.send(req.params);
  res.status = 200;
});

module.exports = router;
