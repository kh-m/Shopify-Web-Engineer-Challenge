var express  = require("express"),
    app      = express(),
    request  = require("request");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))

app.get("/", function(req, res) {
    res.render("main")
});


app.listen(8000, function() {
    console.log("Server is running.");
});
