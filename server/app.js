"use strict";

let app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    path = require('path'),
    request = require('request'),
    parseString = require('xml2js').parseString,
    util = require('util'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    morgan = require('morgan'),
    moment = require('moment'),
    fs = require('fs'),

    auth = require('./middlewares/auth.js'),
    logger = fs.createWriteStream(path.join(__dirname, 'log', 'access.log'), {flags: 'a'}),
    port = process.env.PORT || 3001;

//jwt = require('jwt-simple'),
//User = require('./models/User.js'),

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

app.use(require('./routes.js'));

server.listen(port, (err) => {

    if (err) console.log(err);
    console.log(`Listening on localhost ${port}`);

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
