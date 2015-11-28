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
    res.sendFile(path.join(__dirname, '../src', 'index.html'));
});


class Driver {
    static getContent(url, method) {
        request({uri: url, method: method, form: {key: 'value'}}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return JSON.parse(body);
            }
            else {
                console.log(error);
            }
        })
    }
}

function parseXML(data) {
    return parseString(data, (error, result) => {
        return result;
    })
}

request('https://openexchangerates.org/api/latest.json?app_id=d4f7a49c4d5842feb302f37549c768f9', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(JSON.parse(body));
    }
});

// ["gesmes:Envelope"]["Cube"][0]["Cube"][0]["Cube"]

//https://openexchangerates.org/api/latest.json?app_id=d4f7a49c4d5842feb302f37549c768f9