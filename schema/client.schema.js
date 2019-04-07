const mongoose = require('mongoose');
const Mongo = require('../lib/mongo');
const IntentSchema = require('./intent.schema')


const ClientSchema = new mongoose.Schema({
  active: Boolean,
  alias: String,
  name: String,
  api_token: String,
  intents: [IntentSchema],
  user: {type: String, select: false},
  pass: {type: String, select: false}
});

mongoose.model('Client', ClientSchema)
