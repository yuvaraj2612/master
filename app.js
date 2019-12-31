var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  //res.sendFile(__dirname + '/index.html');
	//res.send('<h1>Hello world</h1>');
   res.sendFile(__dirname + '/public/views/index.html');
});



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
    //io.emit('chat message',user_id,msg,time);//send message to all user
	io.to(socket.id).emit('chat message',user_id,msg,time);//send message to specific user

	socket.broadcast.to(socket.id).emit('chat message',user_id,msg,time);
	   //console.log(socket.id + 'chat message');

  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
//https://socket.io/get-started/chat/
