var express  = require("express"),
    app      = express(),
    request  = require("request"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    db       = require('./models'),
    seed     = require('./seed');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var wasteRoutes = require('./routes/waste')

app.use('/api/waste', wasteRoutes);

app.get("/", function(req, res) {
    console.log("it's the root");
    seed();
    res.sendFile(__dirname + "/views/index.html");
});


app.listen(8000, function() {
    console.log("Server is running.");
});
