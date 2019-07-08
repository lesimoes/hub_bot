var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

const sendMsg = (msg) => {
  io.emit('chat message', msg);
};

module.exports = {
  ...io,
}