// Survey questions

var questions = [
    "In public settings, you're happy and talkative.",
    "In private, you're laid back.",
    "Your ideal gathering with friends is dinner and movie.",
    "Your ideal vacation is backpacking through Europe.",
    "You rarely feel stressed.",
    "You procrastinate projects, waiting until the last minute to begin.",
    "You love pets.",
    "Friends would call you the life of the party.",
    "You exercise regularly.",
    "You consider yourself well cultured."
];

// Answer Choice

var choices =[
    '1 (Strongly Agree)',
    '2 (Agree)',
    '3 (Neither Agree or Disagree)',
    '4 (Disagree)',
    '5 (Strongly Disagree)'
];

$(document).ready(function() {
    //link to div where questions will be inserted and initialize counter to 0
    var questionDiv = $('#questions');
    var i = 0;
    //create a div for each question.
    questions.forEach(function(question) {
        i++;
        //fill div with header, question and choices.
        var item = $('<div class="question">');
        var headline = $('<h4>').text('Question ' + i);
        var questionText = $('<p>').text(question);
        var dropDown = $('div class="form-group">');
        var select = $('<select class="form-control selector">') ;
        // Create an option for each choice.
    choices.forEach(function(choice)  {
        var option = $('<option>').text(choice);
        select.append(option);
    });
    select.attr('id', 'select' + i);
    //add the dropdown to the item, then add the item to the questions div.
    dropDown.append(select);
    item.append(headline, questionText, dropDown);
    var br = $('<br>');
    questionDiv.append(item, br);
    });

    //Event handler for when the form is submitted.
    $('#submitForm').on('click', function(event) {
        // Prevent reload.
        event.preventDefault();

        //Capture name and photo link values.
        var userName = $('#name').val();
        var photoLink = $('#photoLink').val();
        console.log("name " + userName + " url " + photoLink);
        //if both the items were filled out, gather other answers and submit.
        if (userName.length> 0 && photoLink.length > 0) {
            var answers = [];

            //Add the response for each selector to the array of answers. 
            Object.keys($('.selector')).forEach(function(key) {
                if (answers.length < questions.length) {
                    //take only the first character of the answer, which is the number.
                    answers.push($('.selector')[key].value.charAt(0));
                }
            });

            //put data in object form.
            var surveyData = {
                name: userName,
                photo: photoLink,
                answers: answers
            };

            //POST data to /api/friends.
            $.post('/api/friends', surveyData, function(data) {
                //use data callback to display result.
                if(data) {
                    //empty modal, username, and link fields
                    $('#modalContent').empty();
                    $('#name').val('');
                    $('#photoLink').val('');

                
                //the results are in array form.  grab name and URL for each object
                data.forEach(function(profile) {
                    var profileDiv = $('<div class = "profile>');
                    var name = profile.name;
                    var photoURL = profile.photo;
                    //put name in a header
                    var nameHeader = $('<h3>').text(name);
                    //add photo with 'src' of photoURL submitted
                    var photo = $('<img>').attr('src', photoURL);
                    profileDiv.append(nameheader, photo);

                    //add these items to the modal
                    $('#modalContent').append(profileDiv);
                });

                //if there's a tie for best match and so you have more than one,
                if (data.length >1) {
                    //make sure header is plural.
                    $('.modal-title').text('Your best matches!');
                } else {
                    //header is singular
                    $('.modal-title').text('Your best match!');
                };

                //Display the result modal.
                $('#matchModal').modal();
                }
            });
        //If eather name or URL is missing, show error modal.
        } else {
            $('#errorModal').modal();
            //error modal can be dismissed but will disappear after 2 seconds.
            setTimeout(function() {
                $('#errorModal').modal('hide');
            }, 2000);
        }
        });
    });