//-------------------------------------------------//
// ----- Populates the DB with data from API ----- //
//-------------------------------------------------//

var mongoose = require('mongoose');
var db    = require('./models');



function seedDB() {
    db.Waste.deleteMany({}, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log("Cleared DB");
            $.getJSON("https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000")
            .then(logit)
            .then(populateDB)
        }
    })
}

function logit(stuff) {
    console.log(stuff);
}

function populateDB(data) {
    data.forEach(function(trash) {
        Waste.create(trash, function(err, addedTrash) {
            console.log(addedTrash);
        })
    })
}

module.exports = seedDB;