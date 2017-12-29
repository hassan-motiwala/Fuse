const express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    console.log(req.user)
    if (req.user) {
        res.redirect('/');
    } else {
        res.render('pages/login.njk');
    }
});

module.exports = router;