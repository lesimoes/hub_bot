const mongoose = require('mongoose');
const IntentSchema = require('./schema/intent.schema')
const ClientSchema = require('./schema/client.schema')

const Client = mongoose.model('Client')
const Intent = mongoose.model('Intent');


let client = Client({
  active: true,
  name: 'Pluri Sistemas',
  api_token: 'pluri',
  intents: Intent({
    active: true,
    sentences: ['Oi', 'Quale'],
    responses: ['Ollar', 'Belesma', 'Tendiiiiii'],
    title: 'First'
  })
})

  let result = client.save()

  console.log(result)


//
// IntentSchema.add({
//   active: true,
//   sentences: ['Oi', 'Quale'],
//   title: 'First'
// })
