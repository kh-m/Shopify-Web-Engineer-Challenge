//-------------------------------------------------//
// ----- Populates the DB with data from API ----- //
//-------------------------------------------------//

var mongoose = require('mongoose');
var db = require('./models');
var axios = require('axios');



function seedDB() {
    console.log("entered seedDB");
    db.Waste.deleteMany({}, function (err) {
        if (err) {
            console.log("error with deleteMany");
            console.log(err)
        } else {
            console.log("Cleared DB");
            axios.get('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000')
                .then(function (response) {
                    // console.log(response.data);
                    check(response.data);
                    })
                .catch(function () {
                    console.log("ERROR!");
                })
        }
    })
}

function check(data) {

    data.forEach(function(trash) {
        if(trash.id) {
            console.log("title");
        } else {
            console.log("NO TITLE");
        }
    })

};

function populateDB(data) {
    data.forEach(function (trash) {
        if(trash.title) {
            console.log("it has a title");
        }
        // Waste.create(trash, function (err, addedTrash) {
        //     if (err) {
        //         console.log(err)
        //     } else {
        //         console.log(addedTrash);
        //     }
        // })
    })
};

module.exports = seedDB;