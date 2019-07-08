const router = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const admin = require('firebase-admin');

router.use(bodyParser.json());

const serviceAccount = require('../../multihub-5b105-aecec3c7ef9b.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

router.get('/create', async (req, res, next) => {
  const account = req.app.alias;

  try {
    const result = await db.collection(account)
      .add({ datetime: new Date().getTime() });
    return result;
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post('/sendMsg/:id', async (req, res, next) => {
  const account = req.app.alias;
  try {
    const result = await db.collection(account)
      .doc(req.params.id)
      .collection('messages')
      .add({
        message: req.body.message,
        role: req.body.role,
        datetime: new Date().getTime(),
      });

    return res.status(200).send({ status: 'Message sent successfully!' });
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
