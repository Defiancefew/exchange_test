"use strict";

var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    path = require('path'),
    request = require('request'),
    parseString = require('xml2js').parseString,
    util = require('util'),
    _ = require('lodash'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    //LocalStrategy = require('passport-local').Strategy,
    morgan = require('morgan'),
    moment = require('moment'),
    auth = require('./auth.js'),
    User = require('./models/User.js');

//app.use(morgan('dev'));
//app.use(bodyParser.urlencoded({extended: true}));

// TODO: Learn Morgan

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.use('local-register', auth.registerStrategy);
passport.use('local-login', auth.loginStrategy);

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');

    next();
});

app.post('/register', passport.authenticate('local-register'), function (req, res) {
    auth.createSendToken(req.user, res);
});

app.post('/login', passport.authenticate('local-login'), function (req, res) {
    auth.createSendToken(req.user, res);
});


io.on('connection', function (socket) {
    socket.emit('news', {hello: 'world'});
    socket.on('config', function (data) {

    });
});


server.listen(3000, (err)=> {
    if (err) console.log(err);
    console.log(`Listening on localhost:3000`);
});

app.post('/config',function(req,res){
   console.log(req.body);

    // TODO Mongo db.collection.findAndModify()

});

app.get('/currency', function (req, res) {

    var message = {message: '123'};

    if (!req.headers.authorization) {
        return res.status(401).send({
            message: 'You are not authorized'
        });
    } else {
        let token = req.headers.authorization.split(' ')[1];
        let payload = jwt.decode(token, 'shh...');

        if (!payload.sub) {
            res.status(401).send({
                message: 'Authentication failed'
            });
        }
        res.json(message);
    }

});

//let options = {
//    urlOER: 'https://openexchangerates.org/api/latest.json?app_id=d4f7a49c4d5842feb302f37549c768f9',
//    urlECB: 'http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml',
//    urlCUR: 'http://currency-api.appspot.com/api/USD/EUR.json'
//};
//
//function getContent(url) {
//    request(url, callback);
//
//    function callback(error, response, body) {
//        if (!error && response.statusCode == 200) {
//            return body;
//        }
//        else {
//            throw new Error(error);
//        }
//    }
//}
