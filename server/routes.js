"use strict";

let app = require('express')(),
    passport = require('passport'),
    auth = require('./middlewares/auth.js'),
    jwt = require('jwt-simple'),
    User = require('./models/User.js');

app.post('/register', passport.authenticate('local-register'), (req, res) => auth.createSendToken(req.user, res));
app.post('/login', passport.authenticate('local-login'), (req, res) => auth.createSendToken(req.user, res));

app.post('/config', (req, res) => {

    let payload = auth.tokenCheck(req, res),
        options;

    if (req.body) {
        options = req.body;
        User.update({_id: payload.sub}, {
            options: options.options,
            apiKey: options.apiKey,
            baseValue: options.baseValue
        }, null, (err) => {
            if (err) throw(err);
            res.status(200).send('Everything is fine!');
        });
    }

});

//app.get('/currency', (req, res) => {
//    // TODO Bugfix: Block user apikey send when logged out
//    let payload = auth.tokenCheck(req, res);
//    User.findOne({_id: payload.sub}, (err, user)=> {
//        if (err) {
//            throw(err)
//        }
//
//        if (user.apiKey) {
//            res.status(200).send({api: user.apiKey});
//        } else {
//            res.status(404).send({message: 'You must specify your own api key in options'});
//        }
//    });
//});

module.exports = app;
