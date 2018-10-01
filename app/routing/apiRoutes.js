

var bestFriends = require("../data/friends");


module.exports = function(app) {
    app.get("/api/friends"), function (req, res) {
        res.json(friends);
    };

    app.post("/api/friends", function(req, res) {
        console.log(req.body.values);

        var user = req.body;

        for (var i = 0; i < user.values.length; i++) {
            user.values[i] = parseInt(user.values[i]);    
        }

        var bestFriendIndex = 0
        var minimumDiff = 40

        for (var i = 0; i < friends.length; i++) {
            var totalDifference = 0;

            for (var j = 0; j < friends[i].values.length; j++) {
                var difference = Math.abs(user.values[j] - friends[i].values[j]);

                totalDifference += difference;
            }
        if (totalDifference < minimumDiff) {
            bestFriendIndex = i;
            minimumDiff = totalDifference
        }
        }
        friends.push(user);
        res.json(friends[bestFriendIndex]);
    });
};