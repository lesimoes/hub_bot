const mongoose = require('mongoose');
const Mongo = require('../lib/mongo');

const IntentSchema = new mongoose.Schema({
  active: Boolean,
  title: String,
  sentences: [String],
  responses: [String]
});

mongoose.model('Intent', IntentSchema)

module.exports = IntentSchema
