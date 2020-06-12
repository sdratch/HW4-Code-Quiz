// Make an array for the questions
var question = [
  "What do you call when a function takes in a function as an argument?",
  "Which variable is an integer?",
  "What do you call a function that returns nothing?",
  "What do you call a funtion in a object?",
  "What do you call an array of arrays?",
];
//make an array for the answers with index 0 being the correct answer
var ans1 = ["Callback Function", "Something", "Method", "Nested Function"];
var ans2 = ["12", '"12"', "true", "twelve"];
var ans3 = ["Void", "Event", "Nested Function", "Argument"];
var ans4 = ["Method", "Callback", "Void", "Event"];
var ans5 = ["2-D Array", "Double Array", "Twice Array", "Function"];
//create a 2-d array of answers
var answers = [ans1, ans2, ans3, ans4, ans5];

//get variables from html
//elements that persist throughout the game
var viewHighscoreEl = document.querySelector("#view-highscore");
var timer = document.querySelector("#timer");

//start screen element
var startScreen = document.querySelector(".start-screen");
var startEl = document.querySelector("#start-bttn");

//quiz elements
var quizScreen = document.querySelector(".quiz-screen");
var questionPrompt = document.querySelector("#question-prompt");
var answerbtnsEl = document.querySelector(".answers");
var lastResultEl = document.querySelector("#last-result");

//enter highscore screen elements
var enterScreen = document.querySelector(".enter-hs-screen");
var nameEl = document.querySelector("#highscore-name");
var submitHSEl = document.querySelector("#hs-submit");
var cancelHSEl = document.querySelector("#hs-cancel");

//leaderboard elements
var leaderBoardScreen = document.querySelector(".leaderboard-screen");
var leaderBoardsEl = document.querySelector(".leader-boards");
var backToStartEl = document.querySelector("#back-to-start");

var interval;
var index = 0;
var score;

//Get the current leaderboard, if no leader board create an empty array
var leaderBoards = JSON.parse(localStorage.getItem("leaderBoards"));
if (leaderBoards === null) {
  leaderBoards = [];
}

//Start quiz when start button is pressed
function startQuiz(event) {
  event.preventDefault();


  //toggle display
  toggleDisplay(".quiz-screen");

  //reset values for timer and index and last result element
  index = 0;
  timer.textContent = 60;
  lastResultEl.textContent = "";

  //display the first question
  displayQuestions();

  //interval function for the timer
  interval = setInterval(function () {
    timer.textContent = parseInt(timer.textContent) - 1;

    //when timer runs out or goes below 0 stop and go to enter highschore screen and reset timer
    if (timer.textContent <= 0) {
      timer.textContent = 0;
      score = 0;
      toggleDisplay(".enter-hs-screen");
      clearInterval(interval);
    }
  }, 1000);
}
//function just to display the current questions and increase the index
//also switches when end of quiz
function displayQuestions() {
  //when reaches the end of the quiz stop the timer and go to highscore screen
  if (index >= question.length) {

    toggleDisplay(".enter-hs-screen");
    //check if timer is less than 0
    console.log(score)
    console.log(timer.textContent)
    if (timer.textContent <= 0) {
      timer.textContent = 0;
      score = 0;
      console.log(score)
    }
    
    toggleDisplay(".enter-hs-screen");
    clearInterval(interval);

    return;
  } else {
    questionPrompt.textContent = question[index];
    //go through and add questions
    //radomize a question array
    var mixedAnswers = answers[index].slice();
    mixedAnswers = randArray(mixedAnswers);

    for (var i = 0; i < 4; i++) {
      answerbtnsEl.children[i].children[0].textContent = mixedAnswers[i];
    }
  }
  index++;
}

//function to see get the button press and display either correct or incorrect
function grading(event) {
  event.preventDefault();
  var bttnGuess = event.target.textContent;
  console.log(bttnGuess);

  //check to see if the guess was correct
  var lastResult = isCorrect(bttnGuess);
  
  //display correct or incorrect depeind on if the correct choice was made
  //decrease timer if incorrect choice was a
  if (lastResult) {
    lastResultEl.textContent = "Correct";
  } else {
    timer.textContent = timer.textContent - 10;
    score = timer.textContent;
    lastResultEl.textContent = "Incorrect";
  }
  displayQuestions();
}
//function to randomize arrays
function randArray(oldArray) {
  var newArray = [];
  for (var i = oldArray.length; i > 0; i--) {
    var randIndex = Math.floor(Math.random() * oldArray.length);
    newArray.push(oldArray[randIndex]);
    oldArray.splice(randIndex, 1);
  }
  return newArray;
}

//function to grad the choice and return the answer
function isCorrect(choice) {
  //true if the choice matches the correct answer
  if (choice === answers[index - 1][0]) {
    return true;
  }
  //false if given an incorrect answer
  else {
    return false;
  }
}

//add scores to leader board and sort the leader boads
function submitScore(event) {
  event.preventDefault();
  var name = nameEl.value;

  if (score < 10) {
    score = "0" + score;
  }

  var newScore = score + "-" + name;
  console.log(score);
  console.log(newScore);
  console.log(leaderBoards);
  //exception if user deletes leaderboards during quiz
  if (leaderBoards === null) {
    leaderBoards = [];
  }
  leaderBoards.push(newScore);
  //sort in decreasing order

  leaderBoards.sort();
  leaderBoards.reverse();
  //add to the localstorage
  localStorage.setItem("leaderBoards", JSON.stringify(leaderBoards));
  organizeLeaderBoards();
  toggleDisplay(".leaderboard-screen");
}

//function for pressing the view highscore
function viewHighScore(event) {
  event.preventDefault();
  organizeLeaderBoards();
  toggleDisplay(".leaderboard-screen");
}

//function to add the scores to the html list from the local storage
function organizeLeaderBoards() {
  //clear interval just incase view highscore button is pressed during quiz
  clearInterval(interval);
  //reset the rankings
  leaderBoardsEl.innerHTML = "";

  console.log(leaderBoards);
  leaderBoards = JSON.parse(localStorage.getItem("leaderBoards"));
  console.log(leaderBoards);
  
  //add new elements to the html
  if (leaderBoards === null) {
    leaderBoards =[];
    return;
  } else {
    for (var i = 0; i < leaderBoards.length; i++) {
      var newLi = document.createElement("li");
      newLi.textContent = leaderBoards[i];
      leaderBoardsEl.appendChild(newLi);
    }
  }
}
function refresh(event) {
  event.preventDefault();
  timer.textContent = 60;
  toggleDisplay(".start-screen");
}

//function to toggle the current display
function toggleDisplay(display) {
  if (display === ".start-screen") {
    startScreen.setAttribute("style", "display:block;");
    quizScreen.setAttribute("style", "display:none;");
    enterScreen.setAttribute("style", "display:none;");
    leaderBoardScreen.setAttribute("style", "display:none;");
  }
  if (display === ".quiz-screen") {
    startScreen.setAttribute("style", "display:none;");
    quizScreen.setAttribute("style", "display:block;");
    enterScreen.setAttribute("style", "display:none;");
    leaderBoardScreen.setAttribute("style", "display:none;");
  }
  if (display === ".enter-hs-screen") {
    startScreen.setAttribute("style", "display:none;");
    quizScreen.setAttribute("style", "display:none;");
    enterScreen.setAttribute("style", "display:block;");
    leaderBoardScreen.setAttribute("style", "display:none;");
  }
  if (display === ".leaderboard-screen") {
    startScreen.setAttribute("style", "display:none;");
    quizScreen.setAttribute("style", "display:none;");
    enterScreen.setAttribute("style", "display:none;");
    leaderBoardScreen.setAttribute("style", "display:block;");
  }
}

//playfunctions that loops through questions

//score counter
startEl.addEventListener("click", startQuiz);
answerbtnsEl.addEventListener("click", grading);
submitHSEl.addEventListener("click", submitScore);
viewHighscoreEl.addEventListener("click", viewHighScore);
cancelHSEl.addEventListener("click", refresh);
backToStartEl.addEventListener("click", refresh);

