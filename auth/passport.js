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
    DB.collection('users').findOne({_id: ObjectID(id)}, {fields:{_id: 0, password: 0, pastLogs: 0}}, (err, user) => {
        if (err) console.log(err.stack);
        done(null, user);
    });
});

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    (username, password, done) => { //Authenticates accounts stored in mongo
    DB.collection('users').findOne({email: username, password: password}, (err, user) => {
        if (err) {
            done(err);
        } else if (!user) {
            return done(null, false);
        } else {
            var date = new Date();
            date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            DB.collection('users').update({email: username}, {$push:{pastLogs: date}});
            return done(null, user);
        }
    });
}));