const express = require('express');


const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const port = 3000;

// Set public folder as root
app.use(express.static('public'));

// Provide access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Redirect all traffic to index.html
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

//On connection, print

var clients = 0;
var rooms = [];

io.on('connection', function(socket){
	console.info('A user has connected')
	// console.log('There are' + clients + 'users now')

	socket.on('ROOM', function(data){
		// console.info("ROOM CREATED WITH NAME " + data.Room)
		console.log(data.Room)
		rooms.push(data.Room)
		//console.info(rooms)
	});
	socket.emit('rooms_for_client',{Rooms : rooms});
	socket.on("trigger_app", function(data){
		socket.emit('array_for_app',{Rooms : rooms});	
	});
	socket.broadcast.emit('rooms_for_client',{Rooms : rooms});
});

http.listen(port, () => {
  // eslint-disable-next-line no-console
  console.info('listening on %d', port);
});
