var userController   = require('./controllers/user_controller');
var runController    = require('./controllers/run_controller');
var staticController = require('./controllers/static_controller');
var sessionHelper    = require('./helpers/session')

module.exports = function(app){
  
  //
  //  Static routes
  //
  app.post('/usernamecheck', sessionHelper.userExist);

  app.get('/', function(req, res){
    res.render('index');
  });  

  app.get('/login', function(req, res){
    res.render('login');
  });

  app.post('login', function(req, res){
    staticController.login(req.body, function(results){
      res.render('panel',{results});
    });
  });

  app.get('/signup', function(req, res){
    res.render('signup');
  });

  app.get('/logout', function(req, res){
    staticController.logout(req, function(){
      res.redirect('/');
    });
  });

  app.get('/panel', sessionHelper.requiredAuthentication, function(req, res){
    res.render('panel');
  });

  //
  //  User routes
  //    
  app.get('/user', sessionHelper.requiredAuthentication, function(req, res){
    userController.getUsers(function(results){
      res.json(results);
    });
  });

  app.get('/user/:id', sessionHelper.requiredAuthentication, function(req, res){
    userController.getUserDetails(req.params, function(results){
      res.json(results);
    });
  });

  app.post('/signup', function(req, res){
    userController.addNewUser(req.body, function(results){
      res.redirect('/panel');
    });
  });

  app.put('/user/:id', sessionHelper.requiredAuthentication, function(req, res){
    userController.editUser(req.body, req.params.id, function(results){
      res.json(results);
    });
  });

  app.delete('/user/:id', sessionHelper.requiredAuthentication, function(req, res){
    userController.deleteUser(req.params.id, function(results){
      res.json(results);
    });
  });

  //
  //  Run routes
  //
  app.get('/run', sessionHelper.requiredAuthentication, function(req, res){
    runController.getRuns(function(results){
      res.json(results);
    });
  });

  app.get('/run/:id', sessionHelper.requiredAuthentication, function(req, res){
    runController.getRunDetails(req.params, function(results){
      res.json(results);
    });
  });

  app.post('/run', sessionHelper.requiredAuthentication, function(req, res){
    runController.addNewRun(req.body, function(results){
      res.json(results);
    });
  });

  app.put('/run/:id', sessionHelper.requiredAuthentication, function(req, res){
    runController.editRun(req.body, req.params.isbn, function(results){
      res.json(results);
    });
  });

  app.delete('/run/:id', sessionHelper.requiredAuthentication, function(req, res){
    runController.deleteRun(req.params.isbn, function(results){
      res.json(results);
    });
  });

}