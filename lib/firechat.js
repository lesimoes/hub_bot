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
  const data = params.body;

  data.created_at   = new Date().getTime();
  data.updated_at   = new Date().getTime();
  data.started_at   = null;
  data.finished_at  = null;
  data.inAttendance = false;
  data.operatorId   = null;
  data.operatorName = null;

  const result = await db.collection(account).add(data);
  return result;
};

const finish = async (params) => {
  const { account, key } = params;

  data = {
    "finished_at" : new Date().getTime(),
    "inAttendance": false
  }

  const result = await db.collection(account).doc(key).update(data);
  return result;
};

const createFirebase = async (params) => {
  const { account } = params;
  const ref = fb.ref("messages/"+account).push(params);
  return ref;
};

const getQueue = async (params) => {
  const { account, queue } = params;
  const ref = fb.ref("status/"+account+"/"+queue);
  const result = await ref.once("value");
  return result;
};

const createQueue = async (params) => {

  const {account, queue, key, protocol} = params;

  try {
    const result = await db.collection('filas')
      .doc(account)
      .collection('atendimento')
      .doc(protocol)
      .set({
        queue: queue,
        key: key,
        datetime: +new Date(),
      });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  sendMsg,
  getValue,
  create,
  finish,
  getMessages,
  getLastMessage,
  getQueue,
  createFirebase,
  createQueue
};
