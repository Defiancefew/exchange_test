"use strict";

let app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    path = require('path'),
    request = require('request'),
    parseString = require('xml2js').parseString,
    util = require('util'),
    _ = require('lodash'),
    bodyParser = require('body-parser');

server.listen(3000);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

var options = {
    urlOER: 'https://openexchangerates.org/api/latest.json?app_id=d4f7a49c4d5842feb302f37549c768f9',
    urlECB: 'http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml',
    urlCUR: 'http://currency-api.appspot.com/api/USD/EUR.json'
};

function getContent(url) {
    request(url, callback);

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            return body;
        }
    }
}



class Driver {
    static getContent() {

    }

    static subScribe() {

    }

    static unsubscribe() {

    }

}