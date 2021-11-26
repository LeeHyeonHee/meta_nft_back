var express = require('express');
var router = express.Router();

const query = require('../utils/query');
const {getUserHashedPassword} = require('../module/cryptoModule.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
    query.testQuery('SELECT * FROM Test', (err, data) => {
        if (err) throw err;
        else 
            return res.json({data: data});
    })
});

/* GET users listing. */
router.get('/photo', function(req, res, next) {
    query.testQuery('SELECT * FROM Test', (err, data) => {
        if (err) throw err;
        else 
            return res.json({data: data});
    })
});

router.get('/aaaa', function(req, res, next) {
    getUserHashedPassword('user', 'a')
});

module.exports = router;
