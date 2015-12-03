"use strict";

let request = require('request'),
    parseString = require('xml2js').parseString;

module.exports = class requestDriver {

    constructor() {
        this.subscribed = true;
    }

    subscribe(url, socket, parseXML, timeout) {
        let timer,
            data,
            parse = parseXML || false,
            delay = timeout || 5000;


        data = request(url, (error, response, body) => {
            if (!error && response.statusCode == 200) {

                timer = setTimeout(() => this.subscribe(url, socket, parseXML, timeout), delay);

                if (this.subscribed == false) {
                    clearTimeout(timer);
                }
                if (parse) {
                    parseString(body, (err, result) => {
                        let data = result["gesmes:Envelope"]["Cube"][0]["Cube"][0]["Cube"];
                        socket.emit('currency', {
                            urlInfo: url,
                            data,
                            message: 'Successfully parsed XML currency file!'
                        });
                    });
                } else {
                    let data = JSON.parse(body);
                    socket.emit('currency', {
                        urlInfo: url,
                        data,
                        message: 'Successfully parsed JSON file!'});
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

    static init() {
        return new requestDriver();
    }
};
