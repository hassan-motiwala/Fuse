const express = require('express');
var router = express.Router();

//Connect To MongoDB
const mongoConnect = require('../libraries/mongoConnect.js');
var DB;
mongoConnect.connect(() => {
    DB = mongoConnect.getDB();
});

router.get('/', function(req, res) {
    res.render('pages/signup.njk');
});

//User Account Creation
router.post('/', function(req, res) {
    console.log(req.body);
});

module.exports = router;