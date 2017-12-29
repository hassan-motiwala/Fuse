const express = require('express');
const session = require('express-session');
const engines = require('consolidate');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morganLogger = require('morgan');
const passport = require('passport');

const PORT = require('./config/serverConfig.js').PORT;
const APPNAME = require('./config/serverConfig.js').APPNAME;
const KEYS = require('./config/serverConfig.js').KEYS;
const URL = KEYS.mongoURI;
const app = express();

app.engine('njk', engines.nunjucks);
app.set('view engine', 'njk');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morganLogger('dev'));

//PassportJS Setup
app.use(session({ //Session information to track the logged in user
    secret: 'super dooper uber secret',
    resave : true, //saves even when session is not changed
    saveUninitialized : true //save new even when session isnt fully initialized
})); //Use for session storage
app.use(passport.initialize());
app.use(passport.session());


//Require backend routes
const passportAuth = require('./auth/passport');
const authRoutes = require('./auth/authRoutes');
const apiRoutes = require('./api/index');
const testing = require('./routes/testing');
const signup = require('./routes/signup');

authRoutes(app);

app.use('/api', apiRoutes);
app.use('/testing', testing);
app.use('/signup', signup);


//Catches undefined pages
app.get('*', (req, res) => {
    res.render('pages/index', {
        appname: APPNAME
    });
});

//Loads server
app.listen(PORT, function () {
    console.log(`App currently running; navigate to localhost:${PORT} in a web browser.`);
})