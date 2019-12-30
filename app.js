var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  //res.sendFile(__dirname + '/index.html');
	//res.send('<h1>Hello world</h1>');
   res.sendFile(__dirname + '/public/views/index.html');
});

;

/*io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});*/

/*io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});*/

io.on('connection', function(socket){
	//socket.broadcast.emit('hi');	
  socket.on('chat message', function(user_id,msg,time){
	  //console.log("msg"+time);
    io.emit('chat message',user_id,msg,time);
  });
});

//io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets


http.listen(3000, function(){
  console.log('listening on *:3000');
});
//https://socket.io/get-started/chat/
//https://stackoverflow.com/questions/23619015/creating-a-private-chat-between-a-key-using-a-node-js-and-socket-io