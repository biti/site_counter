var socket = io.connect('http://localhost:9393'); 

socket.on('connect',function() {
	socket.emit('set client type', 'stat');
	socket.emit('stats.update', { action: 'enter' });
});

