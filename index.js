var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

var userCount = 0;
var clientUsername = "xcv";
io.sockets.on('connection', function(socket){

    userCount++;
    io.sockets.emit('userCount', {userCount: userCount, clientUsername: clientUsername});

    socket.on('disconnect', function(){
        userCount--;
        io.sockets.emit('userCount', {userCount: userCount, clientUsername: clientUsername});
        console.log('disconnect');
    })
})

http.listen(3000, function(){
    console.log('listening on 3000:');
})  