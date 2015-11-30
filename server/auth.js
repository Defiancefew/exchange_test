var LocalStrategy = require('passport-local').Strategy,
    jwt = require('jwt-simple'),
    User = require('./models/User.js'),
    strategyOptions = {
    usernameField: 'email'
};

exports.loginStrategy = new LocalStrategy(strategyOptions, function (email, password, done) {

    var searchUser = {email: email};

    User.findOne(searchUser, function (err, user) {
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

    var newUser = new User({
        email: email,
        password: password,
        apiKey: null
    });

    newUser.save(function (err) {
        done(null, newUser);
    });
});

exports.createSendToken = function createSendToken(user, res) {
    var payload = {
        sub: user.id
    };

    var token = jwt.encode(payload, 'shh...');

    res.status(200).send({
        user: user.toJSON(),
        token: token
    });
};