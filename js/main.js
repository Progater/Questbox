var questions = [
    {
        prompt: "Wer ist die Bundeskanzlerin?",
        answers: [
            "Angela Merkel",
            "Charles Darwin",
            "Dwight Eisenhower",
            "Der Esel"
        ],
        correct: 0
    },
    {
        prompt: "Wann war der Zweite Weltkrieg?",
        answers: [
            "1391-1425",
            "2017-2019",
            "1939-1945",
            "1871-1895"
        ],
        correct: 2
    },
    {
        prompt: "Was ist die Hauptstadt von Deutschland?",
        answers: [
            "Warschau",
            "Berlin",
            "Stuttgart",
            "London"
        ],
        correct: 1
    },
    {
        prompt: "Wer hat Dynamit erfunden?",
        answers: [
            "Chuck Norris",
            "Charles Kirchenau",
            "Alexander Flemming",
            "Alfred Nobel"
        ],
        correct: 3
    }
];

// Ask a new question
var score = 0;
function askQuestion(questionNumber) {
    // If all questions have been asked, end the game
    if (questionNumber >= questions.length) {
        document.writeln("<h1 style='text-align:center'>Deine Punkte: " + score + "/" + questions.length + "</h1>");
        return;
    }

    // Populate new question
    var question = questions[questionNumber];
    document.getElementById("question").innerHTML = "<h2>" + question.prompt + "</h2>";

    // Clear answer list
    var answerList = document.getElementById("answerList");
    while (answerList.firstChild) {
        answerList.firstChild.remove();
    }

    // Populate answer list anew
    for (let i = 0; i < questions.length; i++) {
        var answer = document.createElement("li");
        answer.innerHTML = questions[questionNumber].answers[i];
        answer.addEventListener("click", function () {
            // Score if answered correctly
            if (i == questions[questionNumber].correct) {
                score++;
            }

            // Ask a new question
            askQuestion(questionNumber + 1);
        });
        answerList.appendChild(answer);
    }
}

// Start quiz game
askQuestion(0);
