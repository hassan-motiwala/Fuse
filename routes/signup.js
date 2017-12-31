const express = require('express');
var router = express.Router();

//Connect To MongoDB
const mongoConnect = require('../libraries/mongoConnect.js');
var DB;
mongoConnect.connect(() => {
    DB = mongoConnect.getDB();
});

router.get('/', function(req, res) {
    req.user ? res.redirect('/') : res.render('pages/signup.njk');
});


//User Account Creation
router.post('/', function(req, res) {
    var newUser = {username: req.body.username, password: req.body.password,
    email: req.body.email, phone: req.body.phone, usertype: null,
    permission: 0, location: null, direction: null,
    active: false, rating: -1, rides: 0, friends: [], blocks: [], pastLogs: [],
    settings: {
        firstName: req.body.fName,
        lastName: req.body.lName,
        birthday: req.body.bday
    }};
    DB.collection('users').find({
        $or:[{username: newUser.username}, {email: newUser.email}, {phone: newUser.phone}]
    }).toArray((err, result) => {
        if (err) {
            console.log(err);
        } else if (result.length == 0) {
            DB.collection('users').insert(newUser, (err)=> {
                err ? console.log(err) : res.send({valid: true});
            });
        } else {
            res.send({valid: false});
        }
    });
});

module.exports = router;