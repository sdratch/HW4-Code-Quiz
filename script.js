// Make an array for the questions
var question = [
  "What do you call when a function takes in a function as an argument?",
  "Which variable is an integer?",
  "What do you call a function that returns nothing?",
  "What do you call a funtion in a object?",
  "What do you call an array of arrays?",
];
//make an array for the answers with index 0 being the correct answer
var ans1 = ["Callback Function", "Something", "Method", "Objects", "Nested Function"];
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
var interval;
var index = 0;
var score;
//Set Timer

//Start quiz when start button is pressed
function startQuiz() {
  //interval function for the
  interval = setInterval(function () {
    console.log(timer.textContent);
    timer.textContent = parseInt(timer.textContent) - 1;

    //when timer runs out or goes below stop and go to enter highschore screen and reset timer
    if (timer.textContent <= 0) {
      timer.textContent = 0;
      score = 0;
      clearInterval(interval);
    }
    if(index === question.length){
        score = timer.textContent;
        clearInterval(interval); 
    }
  }, 1000);
}

function nextQuestion() {

  questionPrompt.textContent = question[index];
  //edit the question variable to be the new questions
  for(var i = 0; i<question.length; i++){
    answerbtnsEl.children[i].children[0].textContent = answers[index][i];
  }
  index++;
}
function quizRun() {}
//Grab local variable as object for user:number

//playfunctions that loops through questions

//score counter
startEl.addEventListener("click", startQuiz);
answerbtnsEl.addEventListener("click", nextQuestion);
