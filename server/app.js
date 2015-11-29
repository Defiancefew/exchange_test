"use strict";

let app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    path = require('path'),
    request = require('request'),
    parseString = require('xml2js').parseString,
    util = require('util'),
    _ = require('lodash'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//
//app.use((req, res, next)=> {
//    res.header('Access-Control-Allow-Origin', '*');
//    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//    res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');
//
//    next();
//});
//
//app.post('/register', (req, res) => {
//    let user = req.body;
//
//    let newUser = new User({
//        email: user.name,
//        password: user.password
//    });
//
//    newUser.save((err) => {
//        res.status(200).json(newUser);
//    })
//});

mongoose.connect('mongodb://127.0.0.1:27017/test');

var db = mongoose.connection;

db.on('error', function(err){
    console.log('Error here.', err)
});

//let User = mongoose.model('User', {
//    email: String,
//    password: String
//});
//
//
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
//
//
//class Driver {
//    static getContent() {
//
//    }
//
//    static subScribe() {
//
//    }
//
//    static unsubscribe() {
//
//    }
//
//}
//
//server.listen(3000, (err)=> {
//    if (err) console.log(err);
//    console.log(`Listening on localhost:3000`);
//});