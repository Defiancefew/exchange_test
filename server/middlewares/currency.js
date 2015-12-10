"use strict";
let fs = require('fs'),
    requestDriver = require('./request').request,
    jwt = require('jwt-simple'),
    User = require('../models/User'),
    process = require('./request').process;

// TODO Refactor options + request different currency from appspot

// OER Api key:  d4f7a49c4d5842feb302f37549c768f9

module.exports = function (io) {

    io.on('connection', (socket) => {
        let subscription;
        socket.emit('status', 'online');

        socket.on('saveOptions', (options) => {
            let payload = jwt.decode(options.token, 'shh...');

            if (!payload.sub) {
                socket.emit('error', {message: 'You\'re not authorized'});
            }

            User.update({_id: payload.sub}, {options: options.options, apiKey: options.apiKey}, null, (err) => {
                if (err) throw(err);
                socket.emit('success', {message: 'Everything fine'});
            });
        });

        socket.on('getOptions', (options) => {
            let payload = jwt.decode(options.token, 'shh...');

            User.findOne({_id: payload.sub}, (err, user)=> {
                if (err) {
                    throw(err)
                }
                if (user.options) {
                    socket.emit('getOptions', {options: user.options, apiKey: user.apiKey});
                } else {
                    socket.emit('error', {message: 'Something went wrong'});
                }
            });
        });

        socket.on('subscribe', (options) => {

            let data = JSON.parse(fs.readFileSync('output.json', 'utf8')),
                subscription = socket.emit('currency', data);

            // TODO : UNCOMMENT AFTER OPTIONS FIX

            //let subscription = process(options, socket);
            //subscription = setInterval(()=> {
            //    process(options, socket);
            //}, 3000);

        });

        socket.on('unsubscribe', () => {
            clearInterval(subscription);
            socket.emit('message', 'cancelled subscription')
        });
    });
};