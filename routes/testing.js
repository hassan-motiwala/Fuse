const express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('pages/testing')
});

//nothing matched
router.get('*', (req, res) => res.status(404).send({ error: 'Invalid Link' }));


module.exports = router;