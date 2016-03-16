var mongoose = require('mongoose');
var User     =  require('');

var runSchema = mongoose.Schema({
  id_user:            {type: Schema.ObjectId, ref:'Run'},
  source:             String,
  destination:        String,
  description:        String,
  price:              Number,
  run_receipt:        String,
  pagaeltaxi_receipt: String
});

var Run = mongoose.model('Run', runSchema);

mongoose.connection;

module.exports.findAll = function(callback){
  Run.find({}, function(err, result){
    if ( err ) throw err;
    callback(result);
  });
}

module.exports.findOne = function(id, callback){
  Book.findOne({_id: id}, function(err, result){
    if ( err ) throw err;
    callback(result);
  });
}

module.exports.addNewRun = function(body, callback){
  var run = new Run({
    id_user:            body.id_user,
    source:             body.source,
    destination:        body.destination,
    description:        body.description,
    price:              body.price,
    run_receipt:        body.run_receipt,
    pagaeltaxi_receipt: body.pagaeltaxi_receipt
  });

  run.save(function(err, result){
    if ( err ) throw err;
    callback({
      messaage:"Carrera creada exitosamente",
      run:result
    });
  });
}

module.exports.editRun = function(body, id, callback){
  User.findOne({_id: id}, function(err, result){
    if ( err ) throw err;

    if(!result){
      callback({
        message:"La carrera: " + id +" no fue encontrada.",
      });
    }

    result.id_user             = body.id_user;
    result.source              = body.source;
    result.destination         = body.destination;
    result.description         = body.description;
    result.price               = body.price;
    result.model               = body.model;
    result.run_receipt         = body.run_receipt;
    result.pagaeltaxi_receipt  = body.pagaeltaxi_receipt;

    result.save(function(err, result){
      if ( err ) throw err;
      callback({
        message:"Carrera actualizada exitosamente",
        run: result
      });
    });

  });
}

module.exports.deleteUser = function(plate, callback){
  User.findOneAndRemove({plate: plate}, function(err, result){
      callback({
        message: "Carrera eliminada correctamente",
        run: result
      });
  });
}