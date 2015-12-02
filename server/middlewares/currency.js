"use strict";

let app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    request = require('request'),
    parseString = require('xml2js').parseString,
    util = require('util'),
    moment = require('moment');

let options = {
    urlOER: 'https://openexchangerates.org/api/latest.json?app_id=d4f7a49c4d5842feb302f37549c768f9',
    urlECB: 'http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml',
    urlCUR: 'http://currency-api.appspot.com/api/USD/EUR.json'
};

class requestDriver {
    constructor() {
        this.subscribed = true;
    }

    subscribe(url, cb) {
        let timer,
            data;

        (cb) ? cb() : null;

        data = request(url, (error, response, body) => {
            if (!error && response.statusCode == 200) {

                timer = setTimeout(() => this.subscribe(url, cb), 5000);

                if (this.subscribed == false) {
                    clearTimeout(timer);
                }
                if (cb) {
                    cb(body, (err, result) => {
                        //console.log(util.inspect(result["gesmes:Envelope"]["Cube"][0]["Cube"][0]["Cube"], false, null));
                        return result;
                    });
                }else{
                    return JSON.parse(body);
                    // TODO Make function return preferred format and restart subscritpion
                }



            }
            else {
                throw new Error(error);
            }

        });

        return data;
    }

    unsubscribe() {
        this.subscribed = false;
    }
}

let driver = new requestDriver();

//driver.subscribe(options.urlOER);

module.exports = function (io) {
    // TODO Desired options
    io.on('connection', (socket) => {
        socket.emit('serverStatus', {message: 'Connected to server'});
        //socket.emit('data', {data: data, message: "Hello there my fellow friend!"});
        //console.log('user connected');
        //socket.on('subscribe', (data) => {
        //    socket.emit('currency', {data: data, updateTime: moment().format()});
        //});
    });

    io.on('currency', (socket) => {
        let data = driver.subscribe(options.urlECB, parseString);
        socket.emit('data', {data: data, message: 'Updating currency...'})
    });

    io.on('locationChanged', (socket) => {
        driver.unsubscribe();
    });

    io.on('disconnect', (socket) => {
        socket.emit('serverStatus', {message: 'Disconnected from server'});
        driver.unsubscribe()
    });
};