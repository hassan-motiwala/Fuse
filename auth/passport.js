const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const ObjectID = require('mongodb').ObjectID;

const KEYS = require('../config/serverConfig').KEYS;

//Connect To MongoDB
const mongoConnect = require('../libraries/mongoConnect.js');
var DB;
mongoConnect.connect(() => {
    DB = mongoConnect.getDB();
});

//Login auth
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    DB.collection('users').findOne({ _id: ObjectID(id) }, {authID:0}, (err, user) => {
        if (err) console.log(err.stack);
        done(null, user);
    });
});

//authID: profile.id, 
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    (username, password, done) => { //Authenticates accounts stored in mongo
    DB.collection('users').findOne({email: username, password: password}, {password: 0}, function(err, user) {
        if (err) {
            done(err);
        } else if (!user) {
            return done(null, false);
        } else {
            console.log(user.email + ' has logged in');
            var date = new Date();
            date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            DB.collection('users').update({email: username}, {$push:{pastLogs: date}});
            return done(null, user);
        }
    });
}));