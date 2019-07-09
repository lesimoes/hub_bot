const Server = require('socket.io');

let io;

const init = (server) => {
  io = new Server(server);
};

const sendMsg = (msg) => {
  io.on('connection', () => {
    io.emit('news', { hello: msg });
    io.on('my other event', (data) => {
      console.log(data);
    });
  });
}

const test = (msg) => {
  io.emit('news', {hello: msg})
};

module.exports = {
  init,
  sendMsg,
  test,
};
