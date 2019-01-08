var express = require("express"),
    app     = express(),
    reqest  = require("request");

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing")
});


app.listen(8000, function() {
    console.log("Server is running.");
});
