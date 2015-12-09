"use strict";
let fs = require('fs'),
    requestDriver = require('./request').request,
    process = require('./request').process;

// TODO Refactor options + request different currency from appspot

// d4f7a49c4d5842feb302f37549c768f9

module.exports = function (io) {

    // default options
    let opts = {
        EXF: {url: 'http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml', parse: true}
    };

    io.on('connection', (socket) => {
        let subscription;
        socket.emit('status', 'online');

        socket.on('options', (options) => {
            opts = options;
            console.log(opts);
            socket.emit('currency', process(opts));
        });

        socket.on('subscribe', () => {

            let subscription = process(opts,socket);

            //let data = JSON.parse(fs.readFileSync('output.json', 'utf8'));
            //console.log(data);
            //socket.emit('currency', data);
            // TODO : UNCOMMENT AFTER OPTIONS FIX
            //console.log(subscription);
            //socket.emit('currency',subscription);
            //subscription = setInterval(()=> {
            //    process(options, socket);
            //}, 3000);

        });

        socket.on('unsubscribe', () => {
            clearInterval(subscription);
            socket.emit('message', 'cancelled subscription')
        })
    });
};