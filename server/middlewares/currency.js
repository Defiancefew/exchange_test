"use strict";

let app = require('express')(),
    server = require('http').createServer(app),
    _ = require('lodash'),
    io = require('socket.io')(server),

    requestDriver = require('./request');

let options = {
    OER: {url: 'https://openexchangerates.org/api/latest.json?app_id=d4f7a49c4d5842feb302f37549c768f9', parseXML: false},
    ECB: {url: 'http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml', parseXML: true},
    CUR: {url: 'http://currency-api.appspot.com/api/USD/EUR.json', parseXML: false}
};

module.exports = function (io) {

    io.on('connection', (socket) => {
        console.log('user connected');
        //setInterval(() =>{
            Promise.all([requestDriver(options.OER.url,options.OER.parseXML),
                requestDriver(options.ECB.url,options.ECB.parseXML),
                requestDriver(options.CUR.url,options.CUR.parseXML)]).then((data) =>{
                socket.emit('currency',data);
            });
        //}, 5000);

    });


};

let newer = [{'$': {currency: 'USD', rate: '1.0671'}},
    {'$': {currency: 'JPY', rate: '131.58'}},
    {'$': {currency: 'BGN', rate: '1.9558'}},
    {'$': {currency: 'CZK', rate: '27.036'}},
    {'$': {currency: 'DKK', rate: '7.4584'}},
    {'$': {currency: 'GBP', rate: '0.71220'}},
    {'$': {currency: 'HUF', rate: '310.93'}},
    {'$': {currency: 'PLN', rate: '4.2859'}},
    {'$': {currency: 'RON', rate: '4.4585'}},
    {'$': {currency: 'SEK', rate: '9.2250'}},
    {'$': {currency: 'CHF', rate: '1.0840'}},
    {'$': {currency: 'NOK', rate: '9.1740'}},
    {'$': {currency: 'HRK', rate: '7.6358'}},
    {'$': {currency: 'RUB', rate: '72.2652'}},
    {'$': {currency: 'TRY', rate: '3.0768'}},
    {'$': {currency: 'AUD', rate: '1.4550'}},
    {'$': {currency: 'BRL', rate: '4.0476'}},
    {'$': {currency: 'CAD', rate: '1.4213'}},
    {'$': {currency: 'CNY', rate: '6.8273'}},
    {'$': {currency: 'HKD', rate: '8.2701'}},
    {'$': {currency: 'IDR', rate: '14733.44'}},
    {'$': {currency: 'ILS', rate: '4.1291'}},
    {'$': {currency: 'INR', rate: '71.1343'}},
    {'$': {currency: 'KRW', rate: '1240.24'}},
    {'$': {currency: 'MXN', rate: '17.6658'}},
    {'$': {currency: 'MYR', rate: '4.5088'}},
    {'$': {currency: 'NZD', rate: '1.6038'}},
    {'$': {currency: 'PHP', rate: '50.269'}},
    {'$': {currency: 'SGD', rate: '1.5010'}},
    {'$': {currency: 'THB', rate: '38.263'}},
    {'$': {currency: 'ZAR', rate: '15.2736'}}];


//let ratesssss = {
//    disclaimer: '123',
//    license: '213',
//    timestamp: 1449266461,
//    base: 'USD',
//    rates: {
//        AED: 3.672832,
//        AFN: 66.879999,
//        ALL: 127.2541,
//        AMD: 484.522499,
//        ANG: 1.78865,
//        AOA: 134.962664,
//        ARS: 9.714387,
//        AUD: 1.362721,
//        AWG: 1.793333,
//        AZN: 1.047588,
//        BAM: 1.806004,
//        BBD: 2,
//        BDT: 78.31806,
//        BGN: 1.80501,
//        BHD: 0.37714,
//        BIF: 1558.565,
//        BMD: 1,
//        BND: 1.399824,
//        BOB: 6.908131,
//        BRL: 3.763471,
//        BSD: 1,
//        BTC: 0.0027612486,
//        BTN: 66.723234,
//        BWP: 10.810438,
//        BYR: 18114.3,
//        BZD: 1.994284,
//        CAD: 1.336226,
//        CDF: 928,
//        CHF: 0.999994,
//        CLF: 0.024602,
//        CLP: 701.620304,
//        CNY: 6.4005,
//        COP: 3181.26165,
//        CRC: 531.498995,
//        CUC: 1,
//        CUP: 0.999638,
//        CVE: 101.39726817,
//        CZK: 24.9374,
//        DJF: 177.576248,
//        DKK: 6.882663,
//        DOP: 45.28228,
//        DZD: 107.393719,
//        EEK: 14.517075,
//        EGP: 7.827163,
//        ERN: 15.0015,
//        ETB: 21.019,
//        EUR: 0.919578,
//        FJD: 2.124767,
//        FKP: 0.661994,
//        GBP: 0.661994,
//        GEL: 2.38445,
//        GGP: 0.661994,
//        GHS: 3.776254,
//        GIP: 0.661994,
//        GMD: 39.75418,
//        GNF: 7755.175098,
//        GTQ: 7.608175,
//        GYD: 205.908836,
//        HKD: 7.749963,
//        HNL: 21.90377,
//        HRK: 7.043637,
//        HTG: 56.104912,
//        HUF: 288.058899,
//        IDR: 13823.75,
//        ILS: 3.827828,
//        IMP: 0.661994,
//        INR: 66.65822,
//        IQD: 1104.008325,
//        IRR: 29995,
//        ISK: 130.404,
//        JEP: 0.661994,
//        JMD: 119.46046,
//        JOD: 0.709512,
//        JPY: 123.146001,
//        KES: 102.1743,
//        KGS: 75.888851,
//        KHR: 4052.402476,
//        KMF: 451.098282,
//        KPW: 899.91,
//        KRW: 1161.276649,
//        KWD: 0.303804,
//        KYD: 0.824907,
//        KZT: 307.088991,
//        LAK: 8153.880098,
//        LBP: 1506.70165,
//        LKR: 143.155899,
//        LRD: 84.66847,
//        LSL: 14.348663,
//        LTL: 3.0908,
//        LVL: 0.652039,
//        LYD: 1.374874,
//        MAD: 9.921814,
//        MDL: 19.8475,
//        MGA: 3251.143333,
//        MKD: 56.59887,
//        MMK: 1271.442512,
//        MNT: 1994.166667,
//        MOP: 7.933791,
//        MRO: 300.209,
//        MTL: 0.683602,
//        MUR: 36.065563,
//        MVR: 15.326667,
//        MWK: 591.755619,
//        MXN: 16.65208,
//        MYR: 4.203069,
//        MZN: 43.79562,
//        NAD: 14.34737,
//        NGN: 199.005101,
//        NIO: 27.91703,
//        NOK: 8.545179,
//        NPR: 105.359199,
//        NZD: 1.48303,
//        OMR: 0.382735,
//        PAB: 1,
//        PEN: 3.365786,
//        PGK: 2.9807,
//        PHP: 47.04863,
//        PKR: 105.377701,
//        PLN: 3.976044,
//        PYG: 5738.838385,
//        QAR: 3.640899,
//        RON: 4.131837,
//        RSD: 112.1767,
//        RUB: 68.03381,
//        RWF: 745.251755,
//        SAR: 3.752141,
//        SBD: 8.028554,
//        SCR: 12.129375,
//        SDG: 6.088695,
//        SEK: 8.510606,
//        SGD: 1.399691,
//        SHP: 0.661994,
//        SLL: 4116.5,
//        SOS: 606.192503,
//        SRD: 3.274673,
//        STD: 22705.5,
//        SVC: 8.678173,
//        SYP: 220.992668,
//        SZL: 14.34587,
//        THB: 35.78224,
//        TJS: 6.75865,
//        TMT: 3.5012,
//        TND: 2.028911,
//        TOP: 2.245997,
//        TRY: 2.890987,
//        TTD: 6.376666,
//        TWD: 32.74793,
//        TZS: 2157.828317,
//        UAH: 23.64681,
//        UGX: 3315.781667,
//        USD: 1,
//        UYU: 29.6065,
//        UZS: 2752.714966,
//        VEF: 6.320421,
//        VND: 22482.4,
//        VUV: 111.723749,
//        WST: 2.633492,
//        XAF: 607.593137,
//        XAG: 0.068796,
//        XAU: 0.00092,
//        XCD: 2.70102,
//        XDR: 0.721339,
//        XOF: 608.088597,
//        XPD: 0.001866,
//        XPF: 110.519863,
//        XPT: 0.001136,
//        YER: 215.076,
//        ZAR: 14.36201,
//        PGK: 2.9807,
//        PHP: 47.04863,
//        PKR: 105.377701,
//        PLN: 3.976044,
//        PYG: 5738.838385,
//        QAR: 3.640899,
//        RON: 4.131837,
//        RSD: 112.1767,
//        RUB: 68.03381,
//        RWF: 745.251755,
//        SAR: 3.752141,
//        SBD: 8.028554,
//        SCR: 12.129375,
//        SDG: 6.088695,
//        SEK: 8.510606,
//        SGD: 1.399691,
//        SHP: 0.661994,
//        SLL: 4116.5,
//        SOS: 606.192503,
//        SRD: 3.274673,
//        STD: 22705.5,
//        SVC: 8.678173,
//        SYP: 220.992668,
//        SZL: 14.34587,
//        THB: 35.78224,
//        TJS: 6.75865,
//        TMT: 3.5012,
//        TND: 2.028911,
//        TOP: 2.245997,
//        TRY: 2.890987,
//        TTD: 6.376666,
//        TWD: 32.74793,
//        TZS: 2157.828317,
//        UAH: 23.64681,
//        UGX: 3315.781667,
//        USD: 1,
//        UYU: 29.6065,
//        UZS: 2752.714966,
//        VEF: 6.320421,
//        VND: 22482.4,
//        VUV: 111.723749,
//        WST: 2.633492,
//        XAF: 607.593137,
//        XAG: 0.068796,
//        XAU: 0.00092,
//        XCD: 2.70102,
//        XDR: 0.721339,
//        XOF: 608.088597,
//        XPD: 0.001866,
//        XPF: 110.50715,
//        XPT: 0.001136,
//        YER: 215.092,
//        ZAR: 14.36308,
//        ZMK: 5253.075255,
//        ZMW: 10.607075,
//        ZWL: 322.387247
//    }
//};
