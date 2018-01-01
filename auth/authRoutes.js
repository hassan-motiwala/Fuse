const passport = require('passport');

module.exports = app => {
    //Connect To MongoDB
    const mongoConnect = require('../libraries/mongoConnect.js');
    var DB;
    mongoConnect.connect(() => {
        DB = mongoConnect.getDB();
    });
    app.get('/api/current-user', (req, res) => {
        if (req.user) {
            res.send(req.user);
        } else {
            res.send(null);
        }
    });
    
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/', failureRedirect: '/login'
        }), (req, res) => {
            res.redirect('/');
        }
    );
    
    app.get('/auth/logout', (req, res) => {
        if(req.user) {
            console.log(`user ${req.user.email} logged out`);
            req.logout();
            res.redirect('/');
        } else {
            res.redirect('/');
        }
    });
};