var express = require('express'),
    app = express(),
    http = require('http').Server(app);

app.use(express.static('templates'));
app.use(express.static('src'));
app.get('/', function (req, res) {
    res.sendFile('/index.html');
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});