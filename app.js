//depedencies
var express = require('express'),
    http = require('http'),
    path = require('path'),
    exphbs = require("express3-handlebars"),

    mongoose = require('mongoose');

var app = express();

app.set('mongodb-uri', process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'localhost/synesthetic');

app.db = mongoose.connect(app.get('mongodb-uri'));

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.engine(".hbs", exphbs({
        defaultLayout: "main",
        extname: ".hbs",
        partialsDir: 'views/partials'
    }));
    app.set('views', __dirname + '/views');
    app.set("view engine", ".hbs");
    app.set("view options", {
        layout: false
    });
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, '/public/')));
    app.use(app.router);
    app.use(function(req, res) {
        res.status(404).render('404', {
            title: '404'
        });
    });
});

app.configure('development', function() {
    app.use(express.logger('dev'));
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

require('./routes')(app, app.db);
app.get('*', function(req, res) {
    res.redirect('/');
});


http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});
