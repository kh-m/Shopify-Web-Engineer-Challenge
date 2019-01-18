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

// For when running on external environment
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server running.");
    console.log("PORT:", process.env.PORT);
    console.log("IP:", process.env.IP);
});

// // For when running locally on port 8000
// app.listen(8000, function(){
//     console.log("Server running.");
// });
