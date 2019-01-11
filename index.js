var express  = require("express"),
    app      = express(),
    request  = require("request"),
    bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.get("/", function(req, res) {
    res.sendFile("index.html");
    // var url = "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000";
    // request(url, function(error, response, body) {
        // if(!error && response.statusCode == 200) {
            // var data = JSON.parse(body);
            // res.sendFile("index.html", {data: data});
        // }
    // });
});


app.listen(8000, function() {
    console.log("Server is running.");
});
