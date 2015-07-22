
window.addEventListener("load", function() {
    // show the first quote
    $('.box[number=0]').show();
    // initialize the user's score to 0
    var score = 0;
    // get the total number of quotes
    var numQuotes = $('input[name=numQuotes]').val();

    // function that executes when you press the "yes" or "no" button
    var checkAnswer = function(button, yes) {
        // get the surrounding box element
        var elem = button.closest('.box');
        // get the number of the quote
        var number = parseInt(elem.attr('number'));
        console.log("number is: " + number);
        // get the author of the quote
        var author = elem.find('input[name=answer]').val();
        // check whether the author is Trump
        var isTrump = (author === "Donald Trump");
        // if the user guessed correctly, display a "Yes message" and increment the score. Otherwise, display a "No message" and don't increment the score
        if(yes && isTrump) {
            alert("Yes, Donald Trump ACTUALLY said that...");
            score++;
        } else if(yes && !isTrump) {
            alert("No, you idiot! Donald Trump would NEVER say that! Instead, "+author+" said that.");
        } else if(!yes && isTrump) {
            alert("Actually, I did said that. Dumbass. -- Donald Trump");
        } else {
            alert("Correct, we all know Donald Trump would never say a thing like that. "+author+" actually said that.");
            score++;
        }
        // render the next quote and hide the current one
        elem.hide();
        console.log("next number is: " + (number+1));
        $('.box[number='+(number+1)+']').show();
        // update the score
        $('.score').html("Score: " + score);
    }

    $('.button-yes').click(function() { checkAnswer($(this), true);});
    $('.button-no').click(function() { console.log("clicked");checkAnswer($(this), false);});
});
