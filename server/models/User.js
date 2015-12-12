"use strict";

var bcrypt = require('bcrypt-nodejs'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    apiKey: String,
    baseValue: String,
    options: mongoose.Schema.Types.Mixed
});


UserSchema.methods.toJSON = function () {
    var user = this.toObject();
    delete user.password;
    return user;
};

UserSchema.methods.comparePasswords = function (password, callback) {
    bcrypt.compare(password, this.password, callback);
};

UserSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        })
    })
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');


