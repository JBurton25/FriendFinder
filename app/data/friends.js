var friends = [ {
    name: "Arnie",
    photo:"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
    values: [
      5,
      1,
      4,
      4,
      5,
      1,
      2,
      5,
      4,
      1
    ]
},
{
    name: "Jerry",
    photo:"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
    values: [
      3,
      2,
      5,
      5,
      1,
      2,
      4,
      3,
      2,
      4
    ]
},
{
    name: "Lucy",
    photo:"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
    values: [
      2,
      2,
      5,
      1,
      1,
      2,
      2,
      3,
      5,
      5
    ]
},
{
    name: "Patty",
    photo:"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
    values: [
      4,
      2,
      3,
      5,
      5,
      2,
      4,
      3,
      4,
      3
    ]
},
{
    name: "Ricky",
    photo:"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
    values: [
      5,
      1,
      4,
      4,
      1,
      1,
      2,
      1,
      3,
      1
    ]
}
];

var bestFriends = function(app) {
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