var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    MongoClient = require('mongodb').MongoClient,
    dbURL = 'mongodb://localhost:27017/DailyCooking',
    db;
app.use(express.static('src'));
app.use(express.static('templates'));

app.get('/', function (req, res) {
    res.sendFile('/app.html');
});



MongoClient.connect(dbURL, function (err, database) {
    if (err) {
        return console.log(err);
    }

    db = database;

    http.listen(3000, function () {
        console.log('listening on *:3000');
    });
});

io.on('connection', function(socket) {
    socket.on('registrate', function (obj) {
        addNewUser(obj)
    });
    socket.on('getRecipes', function (lvl) {
        getRecipes(lvl);
    });
    socket.on('trySignIn', function (userObj) {
        signInUser(userObj);
    });
    socket.on('getUserData', function (username) {
        getUserData(username);
    })
});

function addNewUser(userObj) {
    let collection = db.collection('DailyUsers');
    collection.find({username: userObj.username}).toArray(function (err, res) {
        if(res.length) {
            io.emit('registration-fail', 'Пользователь с таким именем уже существует!');
            return false;
        }
        userObj.userphoto = '/images/versusvirus.jpg';
        collection.insertOne(userObj);
        io.emit('registration-success', `Вы успешно зарегистрировались под именем ${userObj.username}`);
        return true;
    });
}

function signInUser(userObj) {
    let collection = db.collection('DailyUsers');
    collection.find({username: userObj.username}).toArray(function (err, res) {
        if (res.length) {
            if (res[0].password === userObj.password) {
                io.emit('signInSuccess', res[0]);
            } else {
                io.emit('signInFail', 'Неверный пароль');
            }
        } else {
            io.emit('signInFail', 'Такого пользователя не существует');
        }
    })
}

function getUserData(userName) {
    console.log(userName);
    let collection = db.collection('DailyUsers');
    collection.find({username: userName}).toArray(function (err, res) {
        if (res.length) {
            io.emit('userDataAnswer', res[0]);
        }
    })
}

function getRecipes(lvl) {
    let collection = db.collection('DailyRecipes');

    collection.find().toArray(function (err, res) {
        io.emit('recipesLoaded', res);
    })
}