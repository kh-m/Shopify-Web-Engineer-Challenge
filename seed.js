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
                    addToDB(response.data);
                    })
                .catch(function () {
                    console.log("ERROR!");
                })
        }
    })
};

function addToDB(data) {

    data.forEach(function(trash) {
        if(trash.title && trash.body) {
            var title = trash.title;
            var body = trash.body;
            var keywords = trash.keywords;
            db.Waste.create({title: title, body: body, keywords: keywords}, function(err, addedTrash) {
                if(err) {
                    console.log("Error when adding to DB", err);
                } else {
                    console.log("Added to DB");
                    console.log(addedTrash);
                }
            })
        } else {
            console.log("NO TITLE");
        }
    })

};


module.exports = seedDB;