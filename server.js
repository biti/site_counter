var app = require('express').createServer()
  , io = require('socket.io').listen(app)

app.listen(9393);

var onlineNum = 0;

io.sockets.on('connection', function (socket) {

  socket.on('set client type', function(clientType) {
		console.log('a [' + clientType + '] connected!');
    socket.set('clientType', clientType, function(){ socket.emit('set ok'); });

		if('admin' == clientType) {
      socket.emit('stats.get', { 'onlineNum': onlineNum });
		}
  });

  socket.on('stats.update', function (data) {
	  onlineNum += 1;
		socket.broadcast.emit('stats.get', { 'onlineNum': onlineNum });
	});

  socket.on('disconnect', function() {
		socket.get('clientType', function (err, clientType) {
	    console.log(clientType);

	    if(clientType == 'stat') {
	      onlineNum -= 1;
		  }
		});

    socket.broadcast.emit('stats.get', { 'onlineNum': onlineNum });
		console.log('a client out!');
  });

});

