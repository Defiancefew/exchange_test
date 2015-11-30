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
    jwt = require('jwt-simple'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    morgan = require('morgan'),
    User = require('./models/User.js');

//app.use(morgan('dev'));
//app.use(bodyParser.urlencoded({extended: true}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// TODO: Morgan

var strategyOptions = {
    usernameField: 'email'
};
var loginStrategy = new LocalStrategy(strategyOptions, function (email, password, done) {

    var searchUser = {email: email};

    User.findOne(searchUser, function (err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false, {message: 'Wrong email or password'})
        }

        user.comparePasswords(password, function (err, isMatch) {

            if (err) {
                return done(err);
            }

            if (!isMatch) return done(null, false, {message: 'Wrong email or password'});

            return done(null, user);
        })
    });
});
var registerStrategy = new LocalStrategy(strategyOptions, function (email, password, done) {

    var newUser = new User({
        email: email,
        password: password
    });

    newUser.save(function (err) {
        done(null, newUser);
    });


});
passport.use('local-register', registerStrategy);
passport.use('local-login', loginStrategy);

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');

    next();
});

app.post('/register', passport.authenticate('local-register'), function (req, res) {
    createSendToken(req.user, res);
});

app.post('/login', passport.authenticate('local-login'), function (req, res) {
    createSendToken(req.user, res);
});

function createSendToken(user, res) {
    var payload = {
        sub: user.id
    };

    var token = jwt.encode(payload, 'shh...');

    res.status(200).send({
        user: user.toJSON(),
        token: token
    });
}

server.listen(3000, (err)=> {
    if (err) console.log(err);
    console.log(`Listening on localhost:3000`);
});

//app.get('/currency', (req, res) => {
//    let token = req.headers.authorization.split(' ')[1];
//    let payload = jwt.decode(token, 'shh...');
//
//    if (!payload.sub) {
//        res.status(401).send({
//            message: 'Authentication failed'
//        });
//    }
//    if (!req.headers.authorization) {
//        return res.status(401).send({
//            message: 'You are not authorized'
//        });
//    }
//});

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
