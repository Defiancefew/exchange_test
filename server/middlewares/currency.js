"use strict";

let app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),

    requestDriver = require('./request').init();

// TODO Remove hardcoded options

let options = {
    urlOER: ['https://openexchangerates.org/api/latest.json?app_id=d4f7a49c4d5842feb302f37549c768f9', false],
    urlECB: ['http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml',true],
    urlCUR: ['http://currency-api.appspot.com/api/USD/EUR.json', false]
};

module.exports = function (io) {

    // TODO Desired options

    io.on('connection', (socket) => {

        console.log('user connected');

        for(var option in options){
            if(options.hasOwnProperty(option)){
                requestDriver.subscribe(options[option][0],socket,options[option][1]);
            }
        }

        requestDriver.unsubscribe();

    });
};