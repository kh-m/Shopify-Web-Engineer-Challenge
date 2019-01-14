var express  = require("express"),
    app      = express(),
    request  = require("request"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    db       = require('./models')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

var Waste = require('./models/waste');

app.get("/", function(req, res) {
    // load JSON and save it
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

    res.sendFile("index.html");
});


app.listen(8000, function() {
    console.log("Server is running.");
});
