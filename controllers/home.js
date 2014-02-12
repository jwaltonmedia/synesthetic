module.exports = function(app, db) {

    //require data access  - keep methods separate. dependent on data type: user, etc.
    // var dao = require('./data');

    return {
        index: function(req, res) {
            res.render('home');
        }
    }
}