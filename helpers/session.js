var express       = require('express'),
    User          = require('../models/user.js'),
    sessionHash   = require('./hash').hash;

module.exports.authenticate = function(username, pass, fn) {
    User.userExist(username, function (user) {
        if (user) {
            sessionHash(pass, user.salt, function (err, hash) {
                if (err) return fn(err);
                if (hash == user.hash) return fn(null, user);
                fn(new Error('invalid password'));
            });
        } else {
            return fn(new Error('cannot find user'));
        }
    });

}

module.exports.requiredAuthentication = function(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Acceso denegado!';
        res.redirect('/login');
    }
}

module.exports.requiredSameAuthentication = function(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Acceso denegado!';
        res.redirect('/login');
    }
}

module.exports.userExist = function(req, res, next) {
    User.userExist(req.body.username, function(result){
        if(result){
            res.json({available:false});
        }else{
            res.json({available:true});
        }
    });
}