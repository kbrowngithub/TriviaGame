$(document).ready(function () {

    // Question List
    var qObjects = [{
        question: "How do you ...",
        answers: [
            { type: "correct", value: "It is ..." },
            { type: "wrong", value: "It's not ..." },
            { type: "wrong", value: "It's not ..." },
            { type: "wrong", value: "It's not ..." }]
    },
    {
        question: "What is ...",
        answers: [
            { type: "correct", value: "It is ..." },
            { type: "wrong", value: "It's not ..." },
            { type: "wrong", value: "It's not ..." },
            { type: "wrong", value: "It's not ..." }]
    },
    {
        question: "Who is ...",
        answers: [
            { type: "correct", value: "It is ..." },
            { type: "wrong", value: "It's not ..." },
            { type: "wrong", value: "It's not ..." },
            { type: "wrong", value: "It's not ..." }]
    },
    {
        question: "Name the ...",
        answers: [
            { type: "correct", value: "It is ..." },
            { type: "wrong", value: "It's not ..." },
            { type: "wrong", value: "It's not ..." },
            { type: "wrong", value: "It's not ..." }]
    }
    ];

    // Randomize our questions index
    var qCounter = Math.floor(Math.random() * 4);
    console.log("qCounter = " + qCounter);

    // Used the Fisher-Yates algorithm to always shuffle our answers
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            // Switch around array elements based on the random index we just generated
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Display the answers
    function populateAnswers(array) {
        var thisArray = shuffle(array);
        for (i = 0; i < thisArray.length; i++) {
            $(".answer" + i).text(thisArray[i].value);
            $(".answer" + i).attr("value", thisArray[i].type);
            console.log("Set att to " + $(".answer" + i).attr("value"));
        }
    }

    // Set our HTML element values
    $(".timer").text("Time Remaining: " + 15 + " seconds");
    $(".question").text(qObjects[qCounter].question);
    populateAnswers(qObjects[qCounter].answers);

    $(".answers").click(function(event) {
        console.log("$(this).val(value) = " + $(this).attr("value"));
        if ($(this).attr("value") === "correct") {
            $(".question").text("CORRECT!");
        }

    });
});