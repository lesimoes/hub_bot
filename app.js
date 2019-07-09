require('dotenv').config();
const http = require('http');
const express = require('express');
const socket = require('./socket/index');

// eslint-disable-next-line no-multi-assign
const app = module.exports.app = express();
const server = http.createServer(app);

app.set('socket.io', socket);
app.use(require('./routes'));

app.use((req, res, next) => {
  const err = new Error('Route not found');
  err.status = 404;
  next(err);
});

socket.init(server);
socket.sendMsg('ddasdsad')

// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.json({'errors': {
//     message: err.message,
//     error: {}
//   }});
// });

server.listen(process.env.PORT, () => console.log('Hell on ', process.env.PORT));
