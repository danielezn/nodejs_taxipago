var mongoose      = require('mongoose');
var sessionHash   = require('../helpers/hash').hash;
var sessionHelper = require('../helpers/session');

var userSchema = mongoose.Schema({
  username   : { type : String , unique : true, required : true},
  salt       : String,
  hash       : String,
  name       : String,
  last_name  : String,
  phone      : Number,
  plate      : String,
  brand      : String,
  model      : String,
  year       : Number,
  color      : String
});

var User = mongoose.model('User', userSchema);

mongoose.connection;


module.exports.userExist = function(username, callback){
  User.find({username:username}, function(err, result){
    callback(result);
  });
}

module.exports.findAll = function(callback){
  User.find({}, function(err, result){
    if ( err ) throw err;
    callback(result);
  });
}

module.exports.findOne = function(id, callback){
  User.findOne({_id: id}, function(err, result){
    if ( err ) throw err;
    callback(result);
  });
}

module.exports.addNewUser = function(body, callback){
  User.find({username:body.username}, function(err, result){
    if(!result.length){
      sessionHash(body.password, function(err, salt, hash){
        var user = new User({
          username:   body.username,
          salt:       salt,
          hash:       hash, 
          name:       body.name,
          last_name:  body.last_name,
          phone:      body.phone,
          plate:      body.plate,
          brand:      body.brand,
          model:      body.model,
          year:       body.year,
          color:      body.color
        });

        user.save(function(err, result){
          if ( err ) throw err;
            sessionHelper.authenticate(result.username, body.password, function(err, user){
                  if(user){
                      req.session.regenerate(function(){
                          req.session.user = user;
                          req.session.success = 'Authenticated as ' + user.username + ' click to <a href="/logout">logout</a>. ' + ' You may now access <a href="/restricted">/restricted</a>.';
                          res.redirect('/panel');
                      });
                  }
            });
          callback({
            messaage:"Usuario creado exitosamente",
            user:result
          });
        });       
      });
    }else{
        callback({message:"Usuario ya existente"});
    }
  });
}

module.exports.editUser = function(body, id, callback){
  User.findOne({_id: id}, function(err, result){
    if ( err ) throw err;

    if(!result){
      callback({
        message:"La placa: " + id +" no fue encontrada.",
      });
    }

    result.username    = body.username;
    result.name        = body.name;
    result.last_name   = body.last_name;
    result.phone       = body.phone;
    result.plate       = body.plate;
    result.brand       = body.brand;
    result.model       = body.model;
    result.year        = body.year;
    result.color       = body.color;

    result.save(function(err, result){
      if ( err ) throw err;
      callback({
        message:"Usuario actualizado exitosamente",
        user: result
      });
    });

  });
}

module.exports.deleteUser = function(id, callback){
  User.findOneAndRemove({_id: id}, function(err, result){
      callback({
        message: "Usuario eliminado correctamente",
        user: result
      });
  });
}