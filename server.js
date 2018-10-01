var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var PORT = 3000;

//set up express app to handle data parsing 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require("./app/data/friendsData.js")(app);


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});