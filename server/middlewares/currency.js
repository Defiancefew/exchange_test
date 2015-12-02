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

//function getContent(url) {
//    request(url, (error, response, body) => {
//        if (!error && response.statusCode == 200) {
//            parseString(body, (err, result)=> {
//                //console.log(util.inspect(result["gesmes:Envelope"]["Cube"][0]["Cube"][0]["Cube"], false, null));
//                let time = moment().format('MMMM Do YYYY, h:mm:ss a');
//                    //timer = setTimeout(() => getContent(options.urlECB), 8000);
//                console.log("Everything is okay", time);
//                return {
//                    unsubscribe(){
//                        clearTimeout(timer)
//                    },
//                    data: result["gesmes:Envelope"]["Cube"][0]["Cube"][0]["Cube"]
//                }
//
//            });
//
//
//        }
//        else {
//            throw new Error(error);
//        }
//    });
//
//}



module.exports = function (io) {

    //getContent(options.urlECB);


    //io.on('connection', (socket) => {
    //    //socket.emit('data', {data: data, message: "Hello there my fellow friend!"});
    //    console.log('user connected');
    //    socket.on('subscribe', (data) => {
    //        socket.emit('currency', {data: data, updateTime: moment().format()});
    //    });
    //});
    //
    //io.on('disconnect', (socket) => {
    //
    //    socket.emit('message', {message: 'Connection Closed'});
    //});
};