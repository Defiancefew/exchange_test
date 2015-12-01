"use strict";

let app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    path = require('path'),
    util = require('util'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    morgan = require('morgan'),
    fs = require('fs'),

    auth = require('./middlewares/auth.js'),
    logger = fs.createWriteStream(path.join(__dirname, 'log', 'access.log'), {flags: 'a'}),
    port = process.env.PORT || 3001;


passport.serializeUser((user, done) => done(null, user.id));
passport.use('local-register', auth.registerStrategy);
passport.use('local-login', auth.loginStrategy);

app.use(morgan('dev', {stream: logger}));
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');

    next();
});

require('./middlewares/currency.js')(io);

app.use(require('./routes.js'));



server.listen(port, (err) => {

    if (err) console.log(err);
    console.log(`Listening on localhost ${port}`);

});

