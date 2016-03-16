var user = require("../models/user.js");

module.exports.getUsers = function(callback){
  console.log("Fetching all user");
  user.findAll(callback);
}

module.exports.getUserDetails = function(id, callback){
  console.log("Fetching details for book with plate: " + id);
  user.findOne(id, callback);
}

module.exports.addNewUser = function(body, callback){
  console.log('Agregando nuevo usuario');
  user.addNewUser(body, callback);
}

module.exports.editUser = function(body, id, callback){
  console.log("Editando usuario");
  user.editUser(body, id, callback);
}
module.exports.deleteUser = function(plate, callback){
  console.log("Eliminando usuario");
  user.deleteUser(plate, callback);
}