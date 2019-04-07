const router = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ClientSchema = require('../../schema/client.schema')

const Client = mongoose.model('Client')

router.use(bodyParser.json())


router.use(async (req, res, next) => {
  let token = req.baseUrl.split('/')[2]
  let client = await Client.findOne({"api_token" : token}).select(['+pass', '+user'])

  req.app = {
    token: token,
    client: client
  }

  if(!client) return res.sendStatus(404)

  next();
})

router.get('/:id', (req, res, next) => {
    res.send(req.params)
    res.status = 200
})

router.post('/auth', (req, res, next) => {
  const { user, pass } = req.body;
  res.status(200).send(req.app.client)

})

module.exports = router;
