"use strict";

let request = require('request'),
    _ = require('lodash'),
    parseString = require('xml2js').parseString,
    time = require('./time');

module.exports = class currencyDriver {

    static request(url, parseXML) {
        let parse = parseXML || false;

        return new Promise((resolve, reject) => {
            request(url, (error, response, body) => {

                if (!error && response.statusCode == 200) {

                    if (parse) {

                        parseString(body, (err, result) => {

                            let data = result["gesmes:Envelope"]["Cube"][0]["Cube"][0]["Cube"];

                            data = _.map(data, (k) => {
                                return {currency: k['$']['currency'], rate: k['$']['rate']};
                            });

                            resolve({urlInfo: url, data});
                        });
                    } else {
                        let data = JSON.parse(body);

                        resolve({urlInfo: url, data});
                    }
                }
            });
        });
    }

    static process(options, io, message) {

        let mapper = _.map(options, (k, v)=> {
            if (k.enable) {
                return {url: k.url, parse: k.parse};
            }
        });

        mapper = _.uniq(mapper, 'url');
        mapper = _.compact(mapper);
        mapper = _.map(mapper, (k, v) => {
            return this.request(k.url, k.parse);
        });

        return Promise.all(mapper).then(data => {
            io.emit(message.toString(), {data, time: time.time});
        });
    }
};