"use strict";

let app = require('express')(),
    server = require('http').createServer(app),
    _ = require('lodash'),
    io = require('socket.io')(server),
    moment = require('moment'),

    requestDriver = require('./request').request,
    process = require('./request').process;

// TODO Refactor options + request different currency from appspot

//let options = [{ECB: {url: 'http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml', parseXML: true}},
//    {CUR: {url: 'http://currency-api.appspot.com/api/USD/EUR.json', parseXML: false}}
//];

let options = [
    ['http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml', true],
    ['http://currency-api.appspot.com/api/USD/EUR.json', false]
];


// d4f7a49c4d5842feb302f37549c768f9

module.exports = function (io) {

    io.on('connection', (socket) => {
        console.log('user connected');
        let subscription;
        socket.emit('status', 'online');

        socket.on('subscribe', (key) => {
            if (!!key) {
                options[2] = [`https://openexchangerates.org/api/latest.json?app_id=${key}`, false];

                subscription = setInterval(()=> {
                    process(options, socket);
                }, 3000);
            }
            else {
                subscription = setInterval(()=> {
                    process(options, socket);
                }, 3000);
            }
        });

        socket.on('unsubscribe', () => {
            clearInterval(subscription);
            socket.emit('message', 'cancelled subscription')
        })

    });

};