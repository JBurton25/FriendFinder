var express = require("express");
var bodyParser = require("body-parser");
var path = require ("path");

var app = express ();
var PORT = 3000;

//set up express app to handle data parsing 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//data

var friends = [
    {
        name: "ryen li",
        photo: "#",
        answers: [
            5,
            1,
            4,
            5,
            2,
            1,
            2,
            4,
            5,
            4
        ]
    }
];

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

app.get("/survey", function(req,res) {
    res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

app.get("/api/friends", function(req,res) {
    return res.json(friends);
});

app.post("/api/friends", function(req, res) {
    var newFriend = req.body;

    console.log(newFriend);

    friends.push(newFriend);

    res.json(newFreind);
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});