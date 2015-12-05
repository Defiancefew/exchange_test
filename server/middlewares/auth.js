"use strict";

let LocalStrategy = require('passport-local').Strategy,
    jwt = require('jwt-simple'),
    User = require('../models/User.js'),
    strategyOptions = {
        usernameField: 'email'
    };

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
                apiKey: ''
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