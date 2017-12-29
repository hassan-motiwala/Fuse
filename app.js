const express = require('express');
const engines = require('consolidate');
const bodyParser = require('body-parser');
const morganLogger = require('morgan');

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

const apiRoutes = require('./api/index');
const testing = require('./routes/testing');
const signup = require('./routes/signup');

app.use('/api', apiRoutes);
app.use('/testing', testing);
app.use('/signup', signup);

app.get('*', (req, res) => {
    res.render('pages/index', {
        appname: APPNAME
    });
});

app.listen(PORT, function () {
    console.log(`App currently running; navigate to localhost:${PORT} in a web browser.`);
})