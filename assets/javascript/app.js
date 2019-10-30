$(document).ready(function () {

    // Question List
    var qObjects = [{
        question: "How do you ...",
        answers: [
            { type: "correct", value: "It is ..." },
            { type: "wrong1", value: "It's not ..." },
            { type: "wrong2", value: "It's not ..." },
            { type: "wrong3", value: "It's not ..." }]
    },
    {
        question: "What is ...",
        answers: [
            { type: "correct", value: "It is ..." },
            { type: "wrong1", value: "It's not ..." },
            { type: "wrong2", value: "It's not ..." },
            { type: "wrong3", value: "It's not ..." }]
    },
    {
        question: "Who is ...",
        answers: [
            { type: "correct", value: "It is ..." },
            { type: "wrong1", value: "It's not ..." },
            { type: "wrong2", value: "It's not ..." },
            { type: "wrong3", value: "It's not ..." }]
    },
    {
        question: "Name the ...",
        answers: [
            { type: "correct", value: "It is ..." },
            { type: "wrong1", value: "It's not ..." },
            { type: "wrong2", value: "It's not ..." },
            { type: "wrong3", value: "It's not ..." }]
    }
    ];

    // Get our HTML elements using jQuery
    var timer = $(".timer");
    var question = $(".question");
    var ans1 = $(".answer1");
    var ans2 = $(".answer2");
    var ans3 = $(".answer3");
    var ans4 = $(".answer4");

    // Randomize our questions index
    var qCounter = Math.floor(Math.random() * 4);
    console.log("qCounter = " + qCounter);

    // Fisher-Yates algorithm to shuffle our answer array
    function shuffleAnswers(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            // Switch around array elements based on the random index we just generated
            [array[i], array[j]] = [array[j], array[i]];
        }
        // Display our answers
        console.log("array.length = " + array.length)
        for (i = 0; i < array.length; i++) {
            console.log("i = " + i);
            $(".answer" + i).text(array[i].value);
            console.log("array[i].value = " + array[i].value);
        }
    }

    // Set our HTML element values
    timer.text("Time Remaining: " + 15 + " seconds");
    console.log("qObject = " + qObjects[qCounter].question);

    question.text(qObjects[qCounter].question);
    shuffleAnswers(qObjects[qCounter].answers);


});