"use strict";

let moment = require('moment'),
    momentGetTime = moment().format('MMMM Do YYYY, h:mm:ss a');

module.exports = class Timer {
    static get time() {
        return moment().format('MMMM Do YYYY, h:mm:ss a');
    }

    static get timeFromNow() {
        let momentGetTime = moment().format('MMMM Do YYYY, h:mm:ss a');
        return moment(momentGetTime, 'MMMM Do YYYY, h:mm:ss a').fromNow();
    }
};