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

  app.post('/login', function(req, res){
    sessionHelper.authenticate(req.body.username, req.body.password, function(err, user){
      if(err) throw err;
      if(user){
        req.session.regenerate(function(){
          req.session.user = user;
          req.session.success = 'Sesion iniciada exitosamente';
          res.redirect('/panel');
        });
      }else{
        req.session.error = 'Usuario o clave invalida';
        res.redirect('/login');
      }
    });
  });

  app.get('/signup', function(req, res){
    res.render('signup');
  });

  app.get('/logout', function(req, res){
    req.session.destroy(function(){
      res.redirect('/');
    });
  });

  app.get('/panel', sessionHelper.requiredAuthentication, function(req, res){
    res.render('panel',{user:req.session.user});
  });

  //
  //  User routes
  //    
  app.get('/users', sessionHelper.requiredAuthentication, function(req, res){
    userController.getUsers(function(results){
      res.json(results);
    });
  });

  app.get('/user/edit', sessionHelper.requiredAuthentication, function(req, res){
    res.render('edit-user',{user:req.session.user});
  });

  app.post('/user/edit/:id', sessionHelper.requiredAuthentication, function(req, res){
    userController.editUser(req.body, req.params.id, function(results){
      if(results){
              req.session.regenerate(function(){
                  req.session.user = results.user;
                  res.render('user', results.user)
              });
      }
    });
  });

  app.get('/user/:id', sessionHelper.requiredAuthentication, function(req, res){
    userController.getUserDetails(req.params.id, function(results){
      res.render('user',results);
    });
  }); 

  app.post('/signup', function(req, res){
    userController.addNewUser(req.body, function(results){
        sessionHelper.authenticate(results.user.username, req.body.password, function(err, user){
          if (err) throw err;
          if(user){
              req.session.regenerate(function(){
                  req.session.user = user;
                  req.session.success = 'Authenticated as ' + req.body.username + ' click to <a href="/logout">logout</a>. ' + ' You may now access <a href="/restricted">/restricted</a>.';
                  res.redirect('/panel');
              });
          }
        });
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