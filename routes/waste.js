var express = require('express'),
    router  = express.Router();

var db = require('../models');

//  GET:/api/waste
/// searches DB for search matches
router.get('/', function(req, res) {
    console.log("were in api/waste");
});

//  PUT:/api/waste/:wasteId
/// updates 'favorite' value of selected waste
router.put('/:wasteId', function(req, res) {

});

module.exports = router;
