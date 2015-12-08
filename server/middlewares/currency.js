"use strict";
let
//let app = require('express')(),
//    server = require('http').createServer(app),
//    _ = require('lodash'),
//    moment = require('moment'),
    fs = require('fs'),
    requestDriver = require('./request').request,
    process = require('./request').process;

// TODO Refactor options + request different currency from appspot

let options = {
    EXF: {url: 'http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml', parse: true},
    APP: {url: 'http://currency-api.appspot.com/api/EUR/USD.json', parse: false}
};

// d4f7a49c4d5842feb302f37549c768f9

module.exports = function (io) {

    io.on('connection', (socket) => {
        let subscription;
        socket.emit('status', 'online');

        socket.on('options',(data) => {
           console.log(data);
        });

        socket.on('subscribe', (key) => {
            let data = JSON.parse(fs.readFileSync('output.json', 'utf8'));
            //console.log(data);
            socket.emit('currency', data);
            // TODO : UNCOMMENT AFTER OPTIONS FIX
            //if (!!key) {
            //    options.OER = {url:`https://openexchangerates.org/api/latest.json?app_id=${key}`,parse: false};
            //    subscription = process(options,socket);
            //    subscription = setInterval(()=> {
            //        process(options, socket);
            //    }, 3000);
            //}
            //else {
            //    subscription = process(options,socket);
            //    subscription = setInterval(()=> {
            //        process(options, socket);
            //    }, 3000);
            //}
        });

        socket.on('unsubscribe', () => {
            clearInterval(subscription);
            socket.emit('message', 'cancelled subscription')
        })

    });

};