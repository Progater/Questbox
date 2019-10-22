const questions = [
    {
        question: "Wer ist der aktuelle Bundeskanzler?",
        answers: [
            { answer: "Angela Merkel", correct: true },
            { answer: "Charles Darwin", correct: false },
            { answer: "Dwight Eisenhower", correct: false },
            { answer: "Der Esel", correct: false },
        ],
    },
    {
        question: "Wer ist der aktuelle dom?",
        answers: [
            { answer: "Angela ", correct: false },
            { answer: "Charles ", correct: true },
            { answer: "Dwight ", correct: false },
            { answer: "Der ", correct: false },
        ],
    }
];

// Element variables
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-btns");

// Total score
var score = 0;
var currentQuestionIdx = 0;

// Callback-Handling
startButton.addEventListener("click", onStartGame);
nextButton.addEventListener("click", () => {
    currentQuestionIdx++;
    setNextQuestion();
});

// Callback starting new game
function onStartGame() {

    // Setup quiz UI
    questionContainer.classList.remove("hide");
    startButton.classList.add("hide");

    // Setup a new question
    setNextQuestion();
}

// Set a new question
function setNextQuestion() {

    // Reset UI state
    resetQuestion();

    // If all questions have been asked, end the game and prepare for restart
    if (currentQuestionIdx >= questions.length) {
        questionElement.innerHTML = `Deine Punkte: ${score}/${questions.length}`;
        startButton.innerHTML = "Erneut versuchen";
        startButton.classList.remove("hide");
        currentQuestionIdx = 0;
        score = 0;
    } else {
        showQuestion(questions[currentQuestionIdx]);
    }
}

// Reset question board
function resetQuestion() {
    nextButton.classList.add("hide");
    document.body.classList.remove("correct", "wrong");
    while (answerButtons.firstChild) {
        answerButtons.firstChild.remove();
    }
}

// Show a question from database
function showQuestion(question) {

    // Populate new question
    questionElement.innerHTML = question.question;

    // Populate answer buttons
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.innerHTML = answer.answer;
        if (answer.correct) {
            button.dataset.correct = true;
        }
        button.addEventListener("click", onAnswerClicked);
        answerButtons.appendChild(button);
    });
}

// Callback by answer button clicked
function onAnswerClicked(e) {

    // show next button
    nextButton.classList.remove("hide");

    // set new class (correct/wrong) based on correct value
    // also prevent buttons from retrieving new answer
    addClass(document.body, e.target.dataset.correct);
    Array.from(answerButtons.children).forEach(button => {
        addClass(button, button.dataset.correct);
        button.removeEventListener("click", onAnswerClicked);
    });

    // score update
    if (e.target.dataset.correct) {
        score++;
    }
}

// Add a new class based on answer selected
function addClass(element, correct) {
    if (correct) {
        element.classList.add("correct");
        element.classList.remove("wrong");
    } else {
        element.classList.remove("correct");
        element.classList.add("wrong");
    }
}