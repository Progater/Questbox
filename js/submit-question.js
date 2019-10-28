// Global element variables
// const startButton = document.getElementById("start-btn");
// const addButton = document.getElementById("add-btn");
const addForm = document.getElementById("add-form");
const submitQuestionButton = document.getElementById("submit-question");
const validateErrorText = document.getElementById("validate-error");
const newQuestion = document.getElementById("new-question");
const newAnswer1 = document.getElementById("new-answer-1");
const newAnswer2 = document.getElementById("new-answer-2");
const newAnswer3 = document.getElementById("new-answer-3");
const newAnswer4 = document.getElementById("new-answer-4");
const newAnswer1Corrrect = document.getElementById("new-answer-1-correct");
const newAnswer2Corrrect = document.getElementById("new-answer-2-correct");
const newAnswer3Corrrect = document.getElementById("new-answer-3-correct");
const newAnswer4Corrrect = document.getElementById("new-answer-4-correct");

// Callback-Handling
addButton.addEventListener("click", onShowQuestionForm);
submitQuestionButton.addEventListener("click", onSubmitNewQuestion);

// Show a new question form to add new question
function onShowQuestionForm() {

    // Setup UI
    startButton.classList.add("hide");
    addButton.classList.add("hide");
    addForm.classList.remove("hide");
}

// Submit a new question
function onSubmitNewQuestion(e) {
    e.preventDefault();

    // Validate input before submitting
    if (validateForm()) {

        // Post new question
        // Edit: this will not work as POST method is not allowed without using a real server
        // You would rather spezify serverside file here that handles the post at backend, like "handle-question.php"
        // fetch("handle-question.php", {
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-type": "application/json"
            },
            body: JSON.stringify(createQuestionAsJSON())
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));

        // Reset values
        validateErrorText.innerHTML = "";
        newQuestion.value = "";
        newAnswer1.value = "";
        newAnswer2.value = "";
        newAnswer3.value = "";
        newAnswer4.value = "";
        newAnswer1Corrrect.checked = false;
        newAnswer2Corrrect.checked = false;
        newAnswer3Corrrect.checked = false;
        newAnswer4Corrrect.checked = false;

        // Go to start state
        startButton.classList.remove("hide");
        addButton.classList.remove("hide");
        addForm.classList.add("hide");

    } else {
        validateErrorText.innerHTML = "Mindestens eines der Eingabefelder ist leerstehend!";
    }
}

// Create a question object as JSON object
function createQuestionAsJSON() {
    return {
        question: newQuestion.value,
        answers: [
            {
                answer: newAnswer1.value,
                correct: newAnswer1Corrrect.checked
            },
            {
                answer: newAnswer2.value,
                correct: newAnswer2Corrrect.checked
            },
            {
                answer: newAnswer3.value,
                correct: newAnswer3Corrrect.checked
            },
            {
                answer: newAnswer4.value,
                correct: newAnswer4Corrrect.checked
            }
        ]
    };
}

// Validate all input fields
function validateForm() {
    // Make sure all fields have at least 1 character set and at least one answer is selected as correct
    if (newQuestion.value === "" ||
        newAnswer1.value === "" ||
        newAnswer2.value === "" ||
        newAnswer3.value === "" ||
        newAnswer4.value === "" ||
        (newAnswer1Corrrect.checked == false &&
            newAnswer2Corrrect.checked == false &&
            newAnswer3Corrrect.checked == false &&
            newAnswer4Corrrect.checked == false)) {
        return false;
    }

    return true;
}