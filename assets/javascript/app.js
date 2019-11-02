// Question List
var questionList = [{
    question: "Which is an alternative term for backpacking?",
    answers: [
        { type: "correct", value: "Trudging" },
        { type: "wrong", value: "Kayaking" },
        { type: "wrong", value: "Tramping" },
        { type: "wrong", value: "Backing" }],
    img: "assets/images/BackPacking.gif"
},
{
    question: "What's the single most important thing needed to survive in the wild?",
    answers: [
        { type: "correct", value: "Water" },
        { type: "wrong", value: "Food" },
        { type: "wrong", value: "Shelter" },
        { type: "wrong", value: "Fire" }],
    img: "assets/images/DrinkingWater.gif"
},
{
    question: "If you're looking for insects to eat, which ones should you avoid?",
    answers: [
        { type: "correct", value: "Bright Ones" },
        { type: "wrong", value: "Big Ones" },
        { type: "wrong", value: "Stinky Ones" },
        { type: "wrong", value: "All of Them" }],
    img: "assets/images/Mantis.webp"
},
{
    question: "It's a good idea to build your shelter near what?",
    answers: [
        { type: "correct", value: "A Water Source" },
        { type: "wrong", value: "Cliffs" },
        { type: "wrong", value: "Dry River Beds" },
        { type: "wrong", value: "A Horse" }],
    img: "assets/images/WaterSource.webp"
},
{
    question: "What type of food or beverages should you AVOID in case of hypothermia?",
    answers: [
        { type: "correct", value: "Caffeine" },
        { type: "wrong", value: "Hot Chocolate" },
        { type: "wrong", value: "Trail Mix" },
        { type: "wrong", value: "Broccoli" }],
    img: "assets/images/BadCoffee.webp"
},
{
    question: "Which symptom determines if you are experiencing severe dehydration?",
    answers: [
        { type: "correct", value: "Vomiting/Diarrhea" },
        { type: "wrong", value: "Dry Mouth" },
        { type: "wrong", value: "Rapid Heartbeat" },
        { type: "wrong", value: "Excessive Sweating" }],
    img: "assets/images/Vomit.webp"
}
];


// var playedQuestions = []; // Holds the ?s we've already played
var correctAnswer; // Holds the current correct answer
var timeToAnswer = 8; // Seconds to answer
var intervalTimer; // Holds the interval id
var gameDisplay = $("#game"); // Game Area

var gameObj = {
    qCounter: -1, // Question index
    time: timeToAnswer,
    questionList: questionList,
    correctCounter: 0,
    incorrectCounter: 0,

    loadQuestion: function () {
        this.qCounter++;
        // Randomize our questions index and check to see if we already played that question
        // for (i = 0; i < questionList.length; i++) {
        //     qCounter = Math.floor(Math.random() * questionList.length);
        //     console.log("questionList[qCounter].notPlayed = " + questionList[qCounter].notPlayed);
        //     if (questionList[qCounter].notPlayed) {
        //         played = false;
        //         playedQuestions.push(questionList.question);
        //         console.log("playedQuestions = " + playedQuestions.toString);
        //         // So we don't play this question again
        //         questionList[qCounter].notPlayed = false;
        //     }
        //     console.log("Loaded up question " + questionList[qCounter].question);
        // }

        // Display the current question
        gameDisplay.html("<h2>" + questionList[this.qCounter].question + "</h2>");
        gameObj.loadAnswers(questionList[this.qCounter].answers);

        // Start our countdown for this question at 1 second intervals
        intervalTimer = setInterval(gameObj.gameTimer, 1000);
    },

    shuffle: function (array) {
        // Correct Answer is always first in the array so grab it before we shuffle
        correctAnswer = questionList[this.qCounter].answers[0].value;

        // Shuffle the answers using Fisher-Yates algorithm
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            // Switch around array elements based on the random index we just generated
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    loadAnswers: function (array) {
        var thisArray = this.shuffle(array);

        for (i = 0; i < thisArray.length; i++) {
            // $(".answer" + i).text(thisArray[i].value);
            // $(".answer" + i).attr("value", thisArray[i].type);
            gameDisplay.append("<button class='answer' id='button' value='" + thisArray[i].type + "'>" + thisArray[i].value + "</button>");
        }
    },

    gameTimer: function () {
        // Decrement countdown timer
        gameObj.time--;

        // Upate display with current countdown value
        $("#countDown").text(gameObj.time);

        // Handle out of time condition
        if (gameObj.time === 0) {
            gameObj.clearTimer();
        }
    },

    clearTimer: function () {
        // Clear timer
        clearInterval(intervalTimer);

        // Update Display
        gameDisplay.html("<h2>Time's Up!</h2>");
        gameDisplay.append("<h3>The Correct Answer was: " + correctAnswer);
        gameDisplay.append("<img src='" + questionList[this.qCounter].img + "' />");
        $("#countDown").html(gameObj.time);

        console.log("clearTimer: If (" + this.qCounter + "===" + (questionList.length - 1));
        if (this.qCounter === (questionList.length - 1)) {
            // If the game is over display the results
            setTimeout(gameObj.stats, 3000);
        }
        else {
            // Load up the next question
            setTimeout(gameObj.loadNext, 3000);
        }
    },

    stats: function () {
        // Clear timer
        clearInterval(intervalTimer);

        // Update Display
        gameDisplay.html("<h2>GAME OVER!</h2>");
        $("#countDown").text(gameObj.time);
        gameDisplay.append("<h3>Correct: " + gameObj.correctCounter + "</h3>");
        gameDisplay.append("<h3>Incorrect: " + gameObj.incorrectCounter + "</h3>");
        gameDisplay.append("<h3>Unanswered: " + (questionList.length - (gameObj.correctCounter + gameObj.incorrectCounter)) + "</h3><br>");
        gameDisplay.append("<button id='play-again'>Click to Play Again</button>");
    },

    wrongAnswer: function () {
        // Clear timer
        clearInterval(intervalTimer);

        // Increment wrong answers
        gameObj.incorrectCounter++;

        // Update Display
        gameDisplay.html("<h2>Sorry!</h2>");
        gameDisplay.append("<h3>The Correct Answer was: " + correctAnswer + "</h3>");
        gameDisplay.append("<img src='" + questionList[this.qCounter].img + "' />");

        // Game over or continue
        console.log("wrongAnswer: If (" + this.qCounter + "===" + (questionList.length - 1));
        if (this.qCounter === (questionList.length - 1)) {
            setTimeout(gameObj.stats, 3000);
        }
        else {
            // Load up the next question
            setTimeout(gameObj.loadNext, 3000);
        }
    },

    correctAnswer: function () {
        // Clear timer
        clearInterval(intervalTimer);
        // Increment correct answers
        gameObj.correctCounter++;

        // Update Display
        gameDisplay.html("<h2>CORRECT!</h2>");
        gameDisplay.append("<img src='" + questionList[this.qCounter].img + "' />");

        // Game over or continue
        console.log("correctAnswer: If (" + this.qCounter + "===" + (questionList.length - 1));
        if (this.qCounter === (questionList.length - 1)) {
            setTimeout(gameObj.stats, 3000);
        }
        else {
            // Load up the next question
            setTimeout(gameObj.loadNext, 3000);
        }
    },

    loadNext: function () {
        // Reset our countdown value
        gameObj.time = timeToAnswer;

        // Display countdown
        $("#countDown").text(gameObj.time);

        // Load Question
        gameObj.loadQuestion();
    },

    resetDisplay: function () {
        // Reset counter values
        this.time = timeToAnswer;
        this.correctCounter = 0;
        this.incorrectCounter = 0;
        this.qCounter = -1;

        // Load first question
        this.loadQuestion();
    },

    answerSelected: function (event) {
        // Clear timer
        clearInterval(intervalTimer);

        // Update Answer Counters
        if ($(event.target).attr("value") === "correct") {
            this.correctAnswer();
        }
        else {
            this.wrongAnswer();
        }
    },
};

//
// Handle these click events
//

// Start Button
$(document).on("click", "#start", function () {
    // Display the timer
    $("#container").prepend("<h2>Time Remaining: <span id='countDown'>" + timeToAnswer + "</span> Seconds</h2>");

    // Load a question
    gameObj.loadQuestion();
});

// Answer Buttons
$(document).on("click", ".answer", function (event) {
    gameObj.answerSelected(event);
});

// Play Again Button
$(document).on("click", "#play-again", function () {
    gameObj.resetDisplay();
});

