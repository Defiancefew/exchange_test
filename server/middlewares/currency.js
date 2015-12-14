"use strict";
let fs = require('fs'),
    jwt = require('jwt-simple'),
    User = require('../models/User'),
    currencyDriver = require('./request');

// TODO Refactor options + request different currency from appspot

// OER Api key (expired):  d4f7a49c4d5842feb302f37549c768f9
// OER Api key2: 23acf14f4532474ab4baffa83808d0e0

module.exports = function (io) {

    io.on('connection', (socket) => {
        let queued;

        socket.emit('status', 'online');

        socket.on('getOptions', (options) => {
            let payload = jwt.decode(options.token, 'shh...');

            User.findOne({_id: payload.sub}, (err, user)=> {
                if (err) {
                    throw(err)
                }
                if (user.options) {
                    socket.emit('getOptions', {options: user.options, apiKey: user.apiKey, baseValue: user.baseValue});
                } else {
                    socket.emit('error', {message: 'Something went wrong'});
                }
            });
        });

        socket.on('checkApiKey', (options)=> {
            currencyDriver.process(options, socket, 'checkApiKey')
        });

        socket.on('queue', (queue) => {
            currencyDriver.process(queue, socket, 'queue');
        });

        socket.on('unsubscribe', ()=> {
            clearInterval(queued);
        })
    });
};