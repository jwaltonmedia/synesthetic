

module.exports = function(app, db) {

    var home = require('./controllers/home')(app, db);
    var window = require('./controllers/window')(app, db);

    app.get('/', home.index);
    app.get('/window', window.index);

}