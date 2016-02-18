var app = require('express')();
var http = require('http').Server(app);
var express = require('express');
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res){
  res.sendfile( __dirname + '/app/controller.html');
});

io.on('connection', function(socket) {
  console.log('Somebody has been connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('presentation:next-slide', function(msg){
    console.log('Going to next slide ' + msg);
    io.emit('presentation:next-slide', msg);
  });

  socket.on('presentation:prev-slide', function(msg){
    console.log('Going to prev slide ' + msg);
    io.emit('presentation:prev-slide', msg);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});