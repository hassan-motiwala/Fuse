const express = require('express');
var router = express.Router();

//Connect To MongoDB
const mongoConnect = require('../libraries/mongoConnect.js');
var DB;
mongoConnect.connect(() => {
    DB = mongoConnect.getDB();
});

router.get('/', (req, res, next) => {
    const testDB = DB.collection('testing');
    testDB.findOne({test:'YAY'}, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.render('pages/testing');
        }
    });
});


module.exports = router;