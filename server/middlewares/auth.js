"use strict";

let LocalStrategy = require('passport-local').Strategy,
    jwt = require('jwt-simple'),
    User = require('../models/User.js'),
    time = require('./time'),
    strategyOptions = {
        usernameField: 'email'
    },
    moment = require('moment');

exports.loginStrategy = new LocalStrategy(strategyOptions, function (email, password, done) {

    User.findOne({email: email}, function (err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false, {message: 'Wrong email or password'})
        }

        user.comparePasswords(password, function (err, isMatch) {

            if (err) {
                return done(err);
            }

            if (!isMatch) return done(null, false, {message: 'Wrong email or password'});

            return done(null, user);
        })
    });
});

exports.registerStrategy = new LocalStrategy(strategyOptions, function (email, password, done) {

    User.findOne({email: email}, (err, user) => {
        if (err) {
            return done(err);
        }

        if (user) {
            return done(null, false, {message: 'Email already taken'});
        }
        else {
            var newUser = new User({
                email: email,
                password: password,
                apiKey: '',
                baseValue: 'USD',
                lastUpdated: moment().format('MMMM Do YYYY, h:mm:ss a'),
                options: {
                    EXF: {
                        enable: true,
                        url: 'http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml',
                        parse: true
                    },
                    APP: {
                        enable: false,
                        url: ``,
                        parse: false
                    },
                    OER: {
                        enable: false,
                        url: ``,
                        parse: false
                    }
                }
            });

            newUser.save(function (err) {
                done(null, newUser);
            });
        }
    });
});

exports.createSendToken = function createSendToken(user, res) {
    var payload = {
        sub: user.id
    };
    console.log(payload.sub);
    var token = jwt.encode(payload, 'shh...');

    res.status(200).send({
        user: user.toJSON(),
        token: token
    });
};

exports.tokenCheck = function tokenCheck(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).send({
            message: 'You are not authorized'
        });
    } else {
        let token = req.headers.authorization.split(' ')[1];
        let payload = jwt.decode(token, 'shh...');

        if (!payload.sub) {
            res.status(401).send({
                message: 'Authentication failed'
            });
        }
        return payload;
    }
};