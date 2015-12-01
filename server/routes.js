"use strict";

let app = require('express')(),
    passport = require('passport'),
    auth = require('./middlewares/auth.js'),
    User = require('./models/User.js');

app.post('/register', passport.authenticate('local-register'), (req, res) => auth.createSendToken(req.user, res));
app.post('/login', passport.authenticate('local-login'), (req, res) => auth.createSendToken(req.user, res));

app.post('/config', (req, res) => {

    let payload = auth.tokenCheck(req, res);

    User.update({_id: payload.sub}, {apiKey: req.body.apiKey}, null, (err) => {
        if (err) throw(err);
        res.status(200).send({message: 'Everything ok'});
    });

});

app.get('/currency', (req, res) => {
    let apiKeys = null;
    let payload = auth.tokenCheck(req, res);

    User.findOne({_id: payload.sub}, 'apiKey', (err, user)=> {
        if(err) throw(err);
        apiKeys = user.apiKey;

        if(apiKeys.length){
            res.status(200).send({api: apiKeys});
        }else{
            res.status(404).send({message: 'Bad news everyone'});
        }
    });
});

module.exports = app;