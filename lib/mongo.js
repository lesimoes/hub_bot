require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
  console.log('OK');
});

mongoose.connection.on('error', (err) => {
  console.log(err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Bye');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
