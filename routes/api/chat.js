const router = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const admin = require('firebase-admin');

const IntentSchema = require('../../schema/intent.schema');
const ClientSchema = require('../../schema/client.schema');

const Client = mongoose.model('Client');
const Intent = mongoose.model('Intent');

router.use(bodyParser.json());

const serviceAccount = require('../../multihub-5b105-aecec3c7ef9b.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

router.get('/create', async (req, res, next) => {

	const urlSplit = req.baseUrl.split('/');
	const account = urlSplit[2];

	// Add a new document with a generated id.
	db.collection(account).add({
	    datetime: new Date().getTime()
	})
	.then(function(docRef) {
	    //console.log("Document written with ID: ", docRef.id);
	    return res.status(200).send({ chat_id : docRef.id });
	})
	.catch(function(error) {
	    //console.error("Error adding document: ", error);
	    return res.status(400).send(error);
	});

});

router.post('/sendMsg/:id', async (req, res, next) => {

	const urlSplit = req.baseUrl.split('/');
	const account = urlSplit[2];

	db.collection(account).doc(req.params.id).collection('messages').add({
	    message: req.body.message,
	    role: req.body.role,
	    datetime: new Date().getTime()
	})
	.then(function(docRef) {
	    //console.log("Document written with ID: ", docRef.id);
	    return res.status(200).send({ status : 'Message sent successfully!' });
	})
	.catch(function(error) {
	    //console.error("Error adding document: ", error);
	    return res.status(400).send(error);
	});

});

module.exports = router;