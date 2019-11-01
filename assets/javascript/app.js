// Question List
var qObjects = [{
    notPlayed: true,
    question: "Which is an alternative term for backpacking?",
    answers: [
        { type: "correct", value: "Trudging" },
        { type: "wrong", value: "Kayaking" },
        { type: "wrong", value: "Tramping" },
        { type: "wrong", value: "Backing" }],
    img: "assets/images/BackPacking.gif"
},
{
    notPlayed: true,
    question: "What's the single most important thing needed to survive in the wild?",
    answers: [
        { type: "correct", value: "Water" },
        { type: "wrong", value: "Food" },
        { type: "wrong", value: "Shelter" },
        { type: "wrong", value: "Fire" }],
    img: "assets/images/DrinkingWater.gif"
},
{
    notPlayed: true,
    question: "If you're looking for insects to eat, which ones should you avoid?",
    answers: [
        { type: "correct", value: "Bright Ones" },
        { type: "wrong", value: "Big Ones" },
        { type: "wrong", value: "Stinky Ones" },
        { type: "wrong", value: "All of Them" }],
    img: "assets/images/Mantis.webp"
},
{
    notPlayed: true,
    question: "It's a good idea to build your shelter near what?",
    answers: [
        { type: "correct", value: "A Water Source" },
        { type: "wrong", value: "Cliffs" },
        { type: "wrong", value: "Dry River Beds" },
        { type: "wrong", value: "A Horse" }],
    img: "assets/images/WaterSource.webp"
},
{
    notPlayed: true,
    question: "What type of food or beverages should you AVOID in case of hypothermia?",
    answers: [
        { type: "correct", value: "Caffeine" },
        { type: "wrong", value: "Hot Chocolate" },
        { type: "wrong", value: "Trail Mix" },
        { type: "wrong", value: "Broccoli" }],
    img: "assets/images/BadCoffee.webp"
},
{
    notPlayed: true,
    question: "Which symptom determines if you are experiencing severe dehydration?",
    answers: [
        { type: "correct", value: "Vomiting/Diarrhea" },
        { type: "wrong", value: "Dry Mouth" },
        { type: "wrong", value: "Rapid Heartbeat" },
        { type: "wrong", value: "Excessive Sweating" }]
}
];

var qCounter = 0; // Question index
var playedQuestions = []; // Holds the ?s we've already played
var correctAnswer; // Holds the current correct answer
var timeToAnswer = 5; // Seconds to answer
var intervalTimer; // Holds the interval id
var gameDisplay = $("#game"); // Game Area

var gameObj = {
    time: timeToAnswer,
    questionList: qObjects,
    currQuestion: 0,
    correctCounter: 0,
    incorrectCounter: 0,

    loadQuestion: function () {
        // Randomize our questions index and check to see if we already played that question
        if (playedQuestions.length === qObjects.length) {
            $(".question").text("GAME OVER!");
        }
        else {
            var played = true;
            while (played) {
                console.log("played = " + played);
                qCounter = Math.floor(Math.random() * 4);
                console.log("qObjects[qCounter].notPlayed = " + qObjects[qCounter].notPlayed);
                if (qObjects[qCounter].notPlayed) {
                    played = false;
                    playedQuestions.push(qObjects.question);
                    console.log("playedQuestions = " + playedQuestions.toString);
                    // So we don't play this question again
                    qObjects[qCounter].notPlayed = false;
                }
                console.log("Loaded up question " + qObjects[qCounter].question);
            }
        }
        $(".question").text(qObjects[qCounter].question);
        loadAnswers(qObjects[qCounter].answers);
    },

    shuffle: function (array) {
        correctAnswer = qObjects[qCounter].answers[0].value;
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            // Switch around array elements based on the random index we just generated
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    loadAnswers: function (array) {
        var thisArray = shuffle(array);
        for (i = 0; i < thisArray.length; i++) {
            $(".answer" + i).text(thisArray[i].value);
            $(".answer" + i).attr("value", thisArray[i].type);
            console.log("Set att to " + $(".answer" + i).attr("value"));
        }
    },

    gameTimer: function () {
        gameObj.time--;
        $("#countDown").text(gameObj.time);
        if (gameObj.counter === 0) {
            gameObj.timeUp();
        }
    },


};


// Timer function
// function startTimer() {
// var timer = 5, minutes, seconds;
// setInterval(function () {
//     minutes = parseInt(timer / 60, 10);
//     seconds = parseInt(timer % 60, 10);
//     seconds = seconds < 10 ? "0" + seconds : seconds;

//     $(".timer").text("Time Remaining: " + seconds + " seconds");

//     if (--timer < 0) {
//         $(".timer").text("Time's Up!");
//         $(".question").text("The correct answer was: " + correctAnswer);
//         timer = 5;
//         loadQuestion();
//         loadAnswers(qObjects[qCounter].answers);

//         // let timerId = setTimeout(() => {resetDisplay(); timer = 5}, 3000);
//     }

    // clearInterval(1000);
    // return;
// }, 1000);

// Listen for a click event
$(document).on("click", "#start", function() {
    // Display the timer
    $("#container").prepend("<h2>Time Remaining: <span id='countDown'>"+timeToAnswer+"</span> Seconds</h2>");

    // Load a question
    game.loadQuestion();
  });

// loadQuestion();
// loadAnswers(qObjects[qCounter].answers);

// Listen for a click event
// $(".answers").click(function (event) {
//     clearInterval(1000);
//     console.log("$(this).val(value) = " + $(this).attr("value"));
//     if ($(this).attr("value") === "correct") {
//         $(".question").text("CORRECT!");
//     }
//     else {
//         $(".question").text("INCORRECT!");
//     }
//     // resetDisplay(qTime);
// });
