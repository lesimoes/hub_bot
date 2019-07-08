const router = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const admin = require('firebase-admin');

router.use(bodyParser.json());

const serviceAccount = require('../multihub-5b105-aecec3c7ef9b.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

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

module.exports = {
  sendMsg,
  getValue,
  create,
  getMessages,
  getLastMessage,
};
