const mongoose = require('mongoose');
const Mongo = require('../lib/mongo');
const IntentSchema = require('./intent.schema')


const ClientSchema = new mongoose.Schema({
  active: Boolean,
  alias: String,
  name: String,
  api_token: String,
  intents: [IntentSchema]
});

mongoose.model('Client', ClientSchema)
