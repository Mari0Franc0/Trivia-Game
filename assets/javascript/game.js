$(document).ready(function() {
  function initialScreen() {
    startScreen =
      "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
    $(".mainArea").html(startScreen);
  }

  initialScreen();

  $("body").on("click", ".start-button", function(event) {
    event.preventDefault();
    clickSound.play();
    generateHTML();

    timerWrapper();
  });

  $("body").on("click", ".answer", function(event) {
    clickSound.play();
    selectedAnswer = $(this).text();
    if (selectedAnswer === correctAnswers[questionCounter]) {
      clearInterval(theClock);
      generateWin();
    } else {
      clearInterval(theClock);
      generateLoss();
    }
  });

  $("body").on("click", ".reset-button", function(event) {
    clickSound.play();
    resetGame();
  });
});

function generateLossDueToTimeOut() {
  unansweredTally++;
  gameHTML =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
    counter +
    "</span></p>" +
    "<p class='text-center'>You ran out of time!  The correct answer was: " +
    correctAnswers[questionCounter] +
    "</p>";
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 2000);
}

function generateWin() {
  correctTally++;
  gameHTML =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
    counter +
    "</span></p>" +
    "<p class='text-center'>Correct! The answer is: " +
    correctAnswers[questionCounter] +
    "</p>";
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 2000);
}

function generateLoss() {
  incorrectTally++;
  gameHTML =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
    counter +
    "</span></p>" +
    "<p class='text-center'>Wrong! The correct answer is: " +
    correctAnswers[questionCounter] +
    "</p>";
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 2000);
}

function generateHTML() {
  gameHTML =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" +
    questionArray[questionCounter] +
    "</p><p class='first-answer answer'>A. " +
    answerArray[questionCounter][0] +
    "</p><p class='answer'>B. " +
    answerArray[questionCounter][1] +
    "</p><p class='answer'>C. " +
    answerArray[questionCounter][2] +
    "</p><p class='answer'>D. " +
    answerArray[questionCounter][3] +
    "</p>";
  $(".mainArea").html(gameHTML);
}

function wait() {
  if (questionCounter < 9) {
    questionCounter++;
    generateHTML();
    counter = 20;
    timerWrapper();
  } else {
    finalScreen();
  }
}

function timerWrapper() {
  theClock = setInterval(thirtySeconds, 1000);
  function thirtySeconds() {
    if (counter === 0) {
      clearInterval(theClock);
      generateLossDueToTimeOut();
    }
    if (counter > 0) {
      counter--;
    }
    $(".timer").html(counter);
  }
}

function finalScreen() {
  gameHTML =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
    counter +
    "</span></p>" +
    "<p class='text-center'>Your Results!" +
    "</p>" +
    "<p class='summary-correct'>Correct Answers: " +
    correctTally +
    "</p>" +
    "<p>Wrong Answers: " +
    incorrectTally +
    "</p>" +
    "<p>Unanswered: " +
    unansweredTally +
    "</p>" +
    "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Retake Quiz!</a></p>";
  $(".mainArea").html(gameHTML);
}

function resetGame() {
  questionCounter = 0;
  correctTally = 0;
  incorrectTally = 0;
  unansweredTally = 0;
  counter = 20;
  generateHTML();
  timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 20;
var questionArray = [
  "Who is the one who executes Ned Stark?",
  "What is the name of Sansa's direwolf?",
  "Who of the following names is not in Arya's kill list?",
  "What is the surname given to bastards born in Dorne?",
  "Who is Lord Commander of the Night's Watch at the beginning of Game of Thrones?",
  "Which of the following characters is first called the King in the North?",
  "Who was the last one to stab Jon Snow?",
  "How many times has Beric Donderion been brought back to life?",
  "Which of the following is not a Sand Snake",
  "What does 'valar dohaeris' mean?"
];
var answerArray = [
  ["The Hound", "Ser Ilyn Payne", "Joffrey Baratheon", "Lord Varys"],
  ["Shaggydog", "Nymeria", "Summer", "Lady"],
  ["Lord Baelish", "Ilyn Payne", "Cercei Lannister", "Thoros of Myr"],
  ["Storm", "Sand", "Snake", "Pyke"],
  ["Eddison Tollett", "Jon Snow", " Ser Alliser Thorne", "Jeor Mormont"],
  ["Rob Stark", "Ned Stark", "Jon Snow", "Bran Stark"],
  ["Sam", "Ser Allister Thorne", "Olly", "Eddison Tollett"],
  ["Seven times", "Four times", "Six times", "Five times"],
  ["Marcella Sand", "Obara Sand", "Nymeria Sand", "Tyene Sand"],
  [
    "All men must fight",
    "All men must live",
    "All men must die",
    "All men must serve"
  ]
];
var correctAnswers = [
  "B. Ser Ilyn Payne",
  "D. Lady",
  "A. Lord Baelish",
  "B. Sand",
  "D. Jeor Mormont",
  "A. Rob Stark",
  "C. Olly",
  "C. Six times",
  "A. Marcella Sand",
  "D. All men must serve"
];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("assets/sound/button-click.mp3");
