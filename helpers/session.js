var express = require('express'),
    User = require('../models/user.js');

module.exports.authenticate = function(usuario, pass, fn) {
    if (!module.parent) console.log('authenticating %s:%s', usuario, pass);

    User.findOne({
        usuario: usuario
    },

    function (err, user) {
        if (user) {
            if (err) return fn(new Error('cannot find user'));
            hash(pass, user.salt, function (err, hash) {
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
        if(!result.length){
            res.json({available:true});
        }else{
            res.json({available:false});
        }
    });
}