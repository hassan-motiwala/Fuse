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
    testDB.find({test:"YAY"}).toArray((err, result)=> {
        console.log(result);
    });
    res.render('pages/testing');
});


module.exports = router;