"use strict";

let request = require('request'),
    util = require('util'),
    _ = require('lodash'),
    parseString = require('xml2js').parseString;

module.exports = class requestDriver {

    constructor() {
        this.subscribed = true;
    }

    subscribe(url, parseXML, timeout) {
        let timer,
            data,
            parse = parseXML || false,
            delay = timeout || 5000;


        return new Promise((resolve, reject) => {
            data = request(url, (error, response, body) => {

                if (!error && response.statusCode == 200) {


                    if (this.subscribed == false) {
                        clearTimeout(timer);
                    }
                    if (parse) {
                        parseString(body, (err, result) => {
                            if (err) reject(err);
                            let data = result["gesmes:Envelope"]["Cube"][0]["Cube"][0]["Cube"];

                            data = _.map(data, (k) => {
                                return {currency: k['$']['currency'], rate: k['$']['rate']};
                            });

                            resolve({
                                urlInfo: url,
                                data
                            });
                        });
                    } else {

                        let data = JSON.parse(body);
                        timer = setTimeout(() => this.subscribe(url, parseXML, timeout), delay);

                        resolve({ urlInfo: url, data});
                    }
                }
                else {
                    reject(error);
                }
            });
        });
    }

    unsubscribe() {
        this.subscribed = false;
    }

    static init() {
        return new requestDriver();
    }
};
