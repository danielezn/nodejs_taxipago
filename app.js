var express    = require("express");
var bodyParser = require("body-parser");
var routes     = require("./routes");
var mongoose   = require('mongoose');
var session    = require('express-session');

//Conexion de la base de datos
var dbHost = 'mongodb://localhost:27017/taxipago';
mongoose.connect(dbHost);

var app = express();

//Configuraciones
app.set("port",8080);
app.use('/public', express.static(__dirname + '/public'));
app.use(session({secret: 'danielezn', resave: true, saveUninitialized:true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');
app.use(function (req, res, next) {
    var err = req.session.error,
        msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + 
    	'</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + 
    	'</p>';
    next();
});

//Router App MVC
routes(app);

app.listen(app.get("port"), function(){
	console.log("Servidor corriendo en http://localhost:"+app.get("port"));
});