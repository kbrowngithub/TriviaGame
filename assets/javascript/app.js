$(document).ready(function () {

    // Question List
    var qObjects = [{
        notPlayed: true,
        question: "How do you ...",
        answers: [
            { type: "correct", value: "It is ..." },
            { type: "wrong", value: "It's not ..." },
            { type: "wrong", value: "It's not ..." },
            { type: "wrong", value: "It's not ..." }]
    },
    {
        notPlayed: true,
        question: "What is ...",
        answers: [
            { type: "correct", value: "It is ..." },
            { type: "wrong", value: "It's not ..." },
            { type: "wrong", value: "It's not ..." },
            { type: "wrong", value: "It's not ..." }]
    },
    {
        notPlayed: true,
        question: "Who is ...",
        answers: [
            { type: "correct", value: "It is ..." },
            { type: "wrong", value: "It's not ..." },
            { type: "wrong", value: "It's not ..." },
            { type: "wrong", value: "It's not ..." }]
    },
    {
        notPlayed: true,
        question: "Name the ...",
        answers: [
            { type: "correct", value: "It is ..." },
            { type: "wrong", value: "It's not ..." },
            { type: "wrong", value: "It's not ..." },
            { type: "wrong", value: "It's not ..." }]
    }
    ];

    var qCounter = 0;
    var playedQuestions = [];
    var correctAnswer;
    console.log("playedQuestions = " + playedQuestions);

    function loadQuestion() {
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
    }

    // Used the Fisher-Yates algorithm to always shuffle our answers
    function shuffle(array) {
        correctAnswer = qObjects[qCounter].answers[0].value;
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            // Switch around array elements based on the random index we just generated
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Display the answers
    function loadAnswers(array) {
        var thisArray = shuffle(array);
        for (i = 0; i < thisArray.length; i++) {
            $(".answer" + i).text(thisArray[i].value);
            $(".answer" + i).attr("value", thisArray[i].type);
            console.log("Set att to " + $(".answer" + i).attr("value"));
        }
    }

    // Timer function
    function startTimer() {
        var timer = 5, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            seconds = seconds < 10 ? "0" + seconds : seconds;

            $(".timer").text("Time Remaining: " + seconds + " seconds");

            if (--timer < 0) {
                clearInterval(1000);
                //counter ended
                $(".timer").text("Time's Up!");
                $(".question").text("The correct answer was: " + correctAnswer);
                var time = 3;
                startDelayTimer(time);
                return;
            }
        }, 1000);
    }

    // Inter-Question Timer
    function startDelayTimer() {
        var display = $(".question");
        function startTimer(time, display) {
            var timer = 3, minutes, seconds;
            setInterval(function () {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);
                seconds = seconds < 10 ? "0" + seconds : seconds;

                if (--timer < 0) {
                    clearInterval(1000);
                    //counter ended
                    resetDisplay();
                    return;
                }
            }, 1000);
        }
    }

    function resetDisplay() {
        // Load Questions and Answers
        loadQuestion();

        // Kick off the timer
        startTimer();

        return;
    }

    var qTime = 5, pTime = 3;
    resetDisplay(qTime);

    // Listen for a click event
    $(".answers").click(function (event) {
        console.log("$(this).val(value) = " + $(this).attr("value"));
        if ($(this).attr("value") === "correct") {
            $(".question").text("CORRECT!");
            resetDisplay(qTime);
        }
    });

});