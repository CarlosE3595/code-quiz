var startButtonEl = document.querySelector("#start-quiz-button");
var userFormEl = document.querySelector("#user-form");
var startContainerEl = document.querySelector("#start-quiz-container");
var questionContainerEl = document.querySelector("#question-container");
var choicesArray = document.querySelectorAll(".choice");
var timerDisplayEl = document.querySelector("#timer-display");
var questionDisplay = document.querySelector(".question-display");
var answersList = document.querySelector("#answers-list");
var answer1 = document.querySelector("#answer-1");
var answer2 = document.querySelector("#answer-2");
var answer3 = document.querySelector("#answer-3");
var answer4 = document.querySelector("#answer-4");
var hscoreOlEl = document.querySelector("#highscores-list");
var clearLocalEl = document.querySelector("#clear-local");
var goBackEl = document.querySelector("#go-back");

var quizQuestionList = ["1) Which of the following is the proper file name for an html file?","2) How do you style any given element inside an html file using CSS?","3) How do you get your JavaScript file to respond to a click event happening in your browser?","4) Which of the following is used to link a class or id from your HTML file to your JavaScript file? ","5) Which of the following is the proper syntax to add a paragraph to your HTML file?"]
var quizAnswers = ["C) index.html","B) Using IDs and Classes","A) By using an event listener in JavaScript code.","A) .querySelector","B) <p></p>"]
var allChoices = [
    ["A) style.css","B) script.js","C) index.html","D) event.listener"],
    ["A) Using JavaScript","B) Using IDs and Classes","C) Using variables","D) Using media query"],
    ["A) By using an event listener in JavaScript code.","B) By using an attribute in code","C) By creating a function in code.","D) By declaring a variable."],
    ["A) .querySelector","B) event listener","C) attribute","D) window.promp"],
    ["A) <h2></h2>","B) <p></p>","C) <form></form>","D) <div></div>"]
]
var quizTimer = 300
var index = 0
var quizScores = 0
var interval; 
var scores = localStorage.getItem("scores");

if (!scores) {
    scores = [];
}else{
    scores = JSON.parse(scores);
}

function startGame() {
    var highScoreEl = document.querySelector(".highscores-screen");
    highScoreEl.classList.remove("highscores-screen-display");   
    highScoreEl.classList.add("highscores-screen");  

    interval = setInterval(timerTick, 1000);
    var questionsEl = document.querySelector("#question-container");
    questionsEl.classList.add("question-screen"); 
    getQuestions();
}

function timerTick() {
    quizTimer--;
    timerDisplayEl.innerText= "Time: " + quizTimer
    if(quizTimer <= 0) {
        quizTimer = 0;
        showForm();
    }
}

function actionHandler(event) {
    if (event){
        console.log(event.target)
        var currentTarget = event.target
            if (index < 4) {
                if(currentTarget.matches("#answer-1")||currentTarget.matches("#answer-2")||currentTarget.matches("#answer-3")||currentTarget.matches("#answer-4")) {
                    console.log(currentTarget.textContent)
                    console.log(quizAnswers[index])
                    if(currentTarget.textContent == quizAnswers[index]){
                    quizScores = 100+ quizTimer
                    console.log("correct answer picked")
                    index++
                    getQuestions();
                    }
                    else{
                    quizTimer = quizTimer - 30
                    console.log("incorrect answer picked")
                    index++
                    getQuestions();
                    }
                    
                    // getQuestions();
                }
            }else{
                showForm();
            }   
    }
}

function showForm() {
    clearInterval(interval);
    var questionsEl = document.querySelector("#question-container");
    questionsEl.classList.remove("question-screen");   
    questionsEl.classList.add("question-screen-hidden");   
    var formEl = document.querySelector("#user-form");
    formEl.classList.remove("user-form-hidden");   
    formEl.classList.add("user-form-display");       
}

function formHandler(event) {
    event.preventDefault();
    var initials = document.querySelector("input[name='initials']").value;
    scores.push({"user": initials, "score": quizTimer});
    localStorage.setItem("scores", JSON.stringify(scores));
    endQuiz();
}



function endQuiz() {
    var formEl = document.querySelector("#user-form");
    formEl.classList.remove("user-form-display");   
    formEl.classList.add("user-form-hidden");  
    var highScoreEl = document.querySelector(".highscores-screen");
    highScoreEl.classList.remove("highscores-screen");   
    highScoreEl.classList.add("highscores-screen-display");   
    for (let i = 0; i < scores.length; i++) {
        var scoreLiEl = document.createElement("li");
        scoreLiEl.innerText = scores[i].user + " - " + scores[i].score;
        hscoreOlEl.appendChild(scoreLiEl);
    }

}

function clearLocal() {
    localStorage.removeItem("scores");
    hscoreOlEl.innerHTML = "";
}

function goBack() {
    location.reload();
}

function populateText() {
    var currentChoices = []
    currentChoices = allChoices[index]
    answer1.innerText = currentChoices[0]
    answer2.innerText = currentChoices[1]
    answer3.innerText = currentChoices[2]
    answer4.innerText = currentChoices[3]
    actionHandler();
}

function gameOver() {
    clearInterval(interval);
}


function getQuestions() {

    questionDisplay.innerText= quizQuestionList[index]

    populateText();
   
}
answersList.addEventListener("click", actionHandler)
startButtonEl.addEventListener("click", startGame)
userFormEl.addEventListener("submit", formHandler)
clearLocalEl.addEventListener("click", clearLocal)
goBackEl.addEventListener("click", goBack)
