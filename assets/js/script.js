var startButtonEl = document.querySelector("#start-quiz-button");
var startContainerEl = document.querySelector("#start-quiz-container");
var questionContainerEl = document.querySelector("#question-container");
var choicesArray = document.querySelectorAll(".choice");
var timerDisplayEl = document.querySelector("#timer-display");
var questionDisplay = document.querySelector(".question-display")
var answersList = document.querySelector("#answers-list")
var quizQuestionList = ["Which of the following is the proper file name for an html file?","question 2","question 3","question 4","question 5"]
var quizAnswers = ["correct answer 1","correct answer 2","correct answer 3","correct answer4","correct answer5"]
var allChoices = [
    ["A","B","C","D"],
    ["A","B","C","D"],
    ["A","B","C","D"],
    ["A","B","C","D"],
    ["A","B","C","D"]
]
var quizTimer = 300
var index = 0
var quizScores = 0
var interval; 


function startGame() {
    interval = setInterval(timerTick, 1000);
    getQuestions();
}

function timerTick() {
    quizTimer--;
    timerDisplayEl.innerText= "Time: " + quizTimer
    if(quizTimer === 0) {
        gameOver();
    }
   
}

function actionHandler(event) {
    // var targetEl
    console.log(event.target)
}

function populateText() {

}

function gameOver() {
    clearInterval(interval);
}


function getQuestions() {
    questionDisplay.innerText= quizQuestionList[index]
    // startContainerEl.classList.add("hide");
    // questionContainerEl.classList.remove("hide");
    // for (let i = 0; i < choicesArray.length; i++) {
    //     choicesArray[i].addEventListener("click", function (event) {
    //         console.log(event.target);
    //         var isCorrect = event.target.getAttribute("data-correct");
    //         if (isCorrect === "true") {
    //             console.log("You have selected the right answer")
    //         } else {
    //             console.log("Wrong!")
    //         }
    //     })
    // }
    index++
}
answersList.addEventListener("click", actionHandler)
startButtonEl.addEventListener("click", startGame)





// var answersList = document.querySelector("#answers-list")
// var highscoresList = document.querySelector("#highscores-list")
// var startQuizBtn = document.querySelector("#start-quiz-btn")




function setNextQuestion() {

}

function selectAnswer() {

}
