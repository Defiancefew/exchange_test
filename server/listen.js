"use strict";
let app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    path = require('path'),
    request = require('request'),
    parseString = require('xml2js').parseString,
    util = require('util');

server.listen(3000);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../src', 'index.html'));
});

app.get('/currency', function (req, res) {
    //res.sendFile(path.join(__dirname, '../src', 'index.html'));
    res.json(xml);
});

//request.post(
//    'https://openexchangerates.org/api/latest.json?app_id=d4f7a49c4d5842feb302f37549c768f9',
//    { form: { key: 'value' } },
//    function (error, response, body) {
//        if (!error && response.statusCode == 200) {
//            console.log(body)
//        }
//    }
//);

//request.post(
//    'http://currency-api.appspot.com/api/USD/EUR.jsonp',
//    { form: { key: 'value' } },
//    function (error, response, body) {
//        if (!error && response.statusCode == 200) {
//            console.log(body)
//        }
//    }
//);

let xml = request.post(
    'http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml',
    { form: { key: 'value' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
            parseString(body, function (error,result) {
                console.log(util.inspect(result, false, null))
            });
        }
    }
);

let data ={ 'gesmes:Envelope':
    { '$':
        { 'xmlns:gesmes': 'http://www.gesmes.org/xml/2002-08-01',
            xmlns: 'http://www.ecb.int/vocabulary/2002-08-01/eurofxref' },
        'gesmes:subject': [ 'Reference rates' ],
        'gesmes:Sender': [ { 'gesmes:name': [ 'European Central Bank' ] } ],
        Cube:
        [ { Cube:
            [ { '$': { time: '2015-11-26' },
                Cube:
                    [ { '$': { currency: 'USD', rate: '1.0612' } },
                        { '$': { currency: 'JPY', rate: '130.06' } },
                        { '$': { currency: 'BGN', rate: '1.9558' } },
                        { '$': { currency: 'CZK', rate: '27.032' } },
                        { '$': { currency: 'DKK', rate: '7.4602' } },
                        { '$': { currency: 'GBP', rate: '0.70280' } },
                        { '$': { currency: 'HUF', rate: '312.27' } },
                        { '$': { currency: 'PLN', rate: '4.2724' } },
                        { '$': { currency: 'RON', rate: '4.4424' } },
                        { '$': { currency: 'SEK', rate: '9.2756' } },
                        { '$': { currency: 'CHF', rate: '1.0868' } },
                        { '$': { currency: 'NOK', rate: '9.1930' } },
                        { '$': { currency: 'HRK', rate: '7.6295' } },
                        { '$': { currency: 'RUB', rate: '69.9537' } },
                        { '$': { currency: 'TRY', rate: '3.0870' } },
                        { '$': { currency: 'AUD', rate: '1.4685' } },
                        { '$': { currency: 'BRL', rate: '3.9935' } },
                        { '$': { currency: 'CAD', rate: '1.4119' } },
                        { '$': { currency: 'CNY', rate: '6.7805' } },
                        { '$': { currency: 'HKD', rate: '8.2247' } },
                        { '$': { currency: 'IDR', rate: '14609.48' } },
                        { '$': { currency: 'ILS', rate: '4.1199' } },
                        { '$': { currency: 'INR', rate: '70.6402' } },
                        { '$': { currency: 'KRW', rate: '1219.31' } },
                        { '$': { currency: 'MXN', rate: '17.5522' } },
                        { '$': { currency: 'MYR', rate: '4.4952' } },
                        { '$': { currency: 'NZD', rate: '1.6144' } },
                        { '$': { currency: 'PHP', rate: '50.013' } },
                        { '$': { currency: 'SGD', rate: '1.4944' } },
                        { '$': { currency: 'THB', rate: '37.949' } },
                        { '$': { currency: 'ZAR', rate: '15.0956' } } ] } ] } ] } };
