var run = require("../models/run.js");

module.exports.getRuns = function(callback){
  console.log("Fetching all runs");
  run.findAll(callback);
}

module.exports.getRunDetails = function(params, callback){
  console.log("Los detalles de la carrera " + params._id);
  run.findOne(params._id, callback);
}

module.exports.addNewRun = function(body, callback){
  console.log("Agregando carrera");
  run.addNewRun(body, callback);
}

module.exports.editRun = function(body, id, callback){
  console.log("Editando carrera");
  run.editRun(body, id, callback);
}
module.exports.deleteRun = function(id, callback){
  console.log("Eliminando carrera");
  run.deleteRun(id, callback);
}