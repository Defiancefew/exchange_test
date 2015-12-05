"use strict";

let request = require('request'),
    _ = require('lodash'),
    parseString = require('xml2js').parseString;

module.exports = function (url, parseXML) {
        let parse = parseXML || false;

    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {

            if (!error && response.statusCode == 200) {

                if (parse) {
                    parseString(body, (err, result) => {
                        if (err) reject(err);

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
            else {
                reject(error);
            }
        });
    });
};
