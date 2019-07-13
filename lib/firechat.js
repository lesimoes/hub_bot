const router = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const admin = require('firebase-admin');

router.use(bodyParser.json());

const serviceAccount = require('../multihub-5b105-aecec3c7ef9b.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://"+serviceAccount.project_id+".firebaseio.com"
});

const db = admin.firestore();
const fb = admin.database();

const sendMsg = async (params) => {
  const {
    account, key, message, role,
  } = params;

  try {
    const result = await db.collection(account)
      .doc(key)
      .collection('messages')
      .add({
        message,
        role,
        datetime: +new Date(),
      });

    return true;
  } catch (error) {
    return false;
  }
};

const getValue = async (params) => {
  const {
    account, key,
  } = params;

  const result = await db.collection(account)
    .doc(key)
    .get();
  return result;
};

const getMessages = async (params) => {
  const { account, key } = params;

  const result = await db.collection(account)
    .doc(key)
    .collection('messages')
    .orderBy('datetime', 'asc')
    .get();

  const messages = result.docs.map(value => value.data());
  return messages;
};

const getLastMessage = async (params) => {
  const { account, key } = params;

  const result = await db.collection(account)
    .doc(key)
    .collection('messages')
    .orderBy('datetime', 'desc')
    .limit(1)
    .get();

  const messages = result.docs.map(value => value.data());
  return messages;
};

const create = async (params) => {
  const { account } = params;
  const result = await db.collection(account)
    .add({ datetime: new Date().getTime() });
  return result;
};

const getQueue = async (params) => {
  const { account, queue } = params;
  const ref = fb.ref("status/"+account+"/"+queue);
  const result = await ref.once("value");
  return result;
};

module.exports = {
  sendMsg,
  getValue,
  create,
  getMessages,
  getLastMessage,
  getQueue
};
