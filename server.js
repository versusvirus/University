var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.use(express.static('src'));
app.use(express.static('templates'));

app.get('/', function (req, res) {
    res.sendFile('/registry.html');
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});



