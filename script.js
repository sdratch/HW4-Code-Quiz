// Make an array for the questions
var question = [
  "What do you call when a function takes in a function as an argument?",
  "Which variable is an integer?",
  "What do you call a function that returns nothing?",
  "What do you call a funtion in a object?",
  "What do you call an array of arrays?",
];
//make an array for the answers with index 0 being the correct answer
var ans1 = [
  "Callback Function",
  "Something",
  "Method",
  "Objects",
  "Nested Function",
];
var ans2 = ["12", '"12"', "true", "twelve"];
var ans3 = ["Void", "Event", "Nested Function", "Argument"];
var ans4 = ["Method", "Callback", "Void", "Event"];
var ans5 = ["2-D Array", "Double Array", "Twice Array", "Function"];
//create a 2-d array of answers
var answers = [ans1, ans2, ans3, ans4, ans5];

//get variables from html
var viewHighscore = document.querySelector("#view-highscore");
var startEl = document.querySelector("#start-bttn");
var answerbtnsEl = document.querySelector(".answers");
var scoreInput = document.querySelector("#highscore-name");
var timer = document.querySelector("#timer");
var questionPrompt = document.querySelector("#question-prompt");
var lastResultEl = document.querySelector("#last-result");
var interval;
var index = 0;
var score;
var leaderBoards = localStorage.getItem()

//Start quiz when start button is pressed
function startQuiz(event) {
  event.preventDefault();
  displayQuestions();
  index++;
  //interval function for the
  interval = setInterval(function () {
    //console.log(timer.textContent);
    timer.textContent = parseInt(timer.textContent) - 1;

    //when timer runs out or goes below stop and go to enter highschore screen and reset timer
    if (timer.textContent <= 0) {
      timer.textContent = 0;
      score = 0;
      clearInterval(interval);
    }
    //when reaches the end of the quiz stop the timer and go to highscore screen
    if (index === question.length) {
      score = timer.textContent;
      clearInterval(interval);
    }
  }, 1000);
}
//function just to display the current questions
function displayQuestions() {
  if (index >= question.length) {
    //switch to highscore
    return;
  } else {
    questionPrompt.textContent = question[index];
    for (var i = 0; i < 4; i++) {
      answerbtnsEl.children[i].children[0].textContent = answers[index][i];
    }
  }
}

function nextQuestion(event) {
  event.preventDefault();
  var bttnGuess = event.target.textContent;
  //console.log(bttnGuess)
  displayQuestions();

  //check to see if the guess was correct
  var lastResult = isCorrect(bttnGuess);
  //display correct or incorrect depeind on if the correct choice was made
  //decrease timer if incorrect choice was a
  if (lastResult) {
    lastResultEl.textContent = "Correct";
  } else {
    timer.textContent = timer.textContent - 10;
    lastResultEl.textContent = "Incorrect";
  }
  index++;
}

function isCorrect(choice) {
//   console.log(answers[index - 1][0]);
//   console.log(choice);
//   console.log(index);

    //true if the choice matches the correct answer
  if (choice === answers[index - 1][0]) {
   // console.log(true);
    return true;
  } 
  //false if given an incorrect answer
  else {
    //console.log(false);
    return false;
  }
}
//Grab local variable as object for user:number

//playfunctions that loops through questions

//score counter
startEl.addEventListener("click", startQuiz);
answerbtnsEl.addEventListener("click", nextQuestion);
