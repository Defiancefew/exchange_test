"use strict";
let fs = require('fs'),
    requestDriver = require('./request').request,
    jwt = require('jwt-simple'),
    User = require('../models/User'),
    process = require('./request').process;

// TODO Refactor options + request different currency from appspot

// OER Api key (expired):  d4f7a49c4d5842feb302f37549c768f9
// OER Api key2: 23acf14f4532474ab4baffa83808d0e0

module.exports = function (io) {

    io.on('connection', (socket) => {
        let subscription,
            additionalSubscription,
            getAPP,
            queue = [];

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

        socket.on('subscribe', options => {
            queue.push(options);
            console.log(queue);
            console.log('this from subscribe');

            // TODO : UNCOMMENT AFTER OPTIONS FIX
            let subscription = process(options, socket, 'currency');

            //subscription = setInterval(()=> {
            //    process(options, socket,'currency');
            //}, 10000);
        });

        socket.on('getAPP', options => {
            if (options) {
                console.log(queue);
                console.log('this from getAPP');
                getAPP = process(options, socket, 'getAPP');
                //additionalSubscription = setInterval(()=> {
                //    process(options, socket,'getAPP');
                //}, 5000);
            }
        });

        socket.on('getAdditional', options => {
            if (options) {
                queue.push(options);
                console.log(queue);
                console.log('this from getAdditional');

                additionalSubscription = process(options, socket, 'getAdditional');
                //additionalSubscription = setInterval(()=> {
                //    process(options, socket,'getAdditional');
                //}, 5000);
            } else {
                socket.emit('getAdditional');
            }
        });

        socket.on('unsubscribe', () => {
            console.log(queue);
            clearInterval(getAPP);
            clearInterval(subscription);
            clearInterval(additionalSubscription);
        });

        socket.on('unsubscribeAPP', () => {
            clearInterval(getAPP);
        });

        socket.on('checkApiKey', (options)=> {
            process(options, socket, 'checkApiKey')
        })
    });
};