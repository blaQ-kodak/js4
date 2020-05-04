// select Elements using js.
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choices = document.getElementById("choices");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const timer = document.getElementById("timer");
const counter = document.getElementById("counter");
const btimeGauge = document.getElementById("btimeGauge");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

let questions = [
  {
    question : "What is Html stands for ?",
    imgSrc : "https://i.postimg.cc/CxN2JGLX/html.png",
    choiceA : "Correct",
    choiceB : "Wrong",
    choiceC : "Wrong",
    correct: "A"
  },
  {
    question : "What is css stands for ?",
    imgSrc : "https://i.postimg.cc/6QPY1Ysj/css.png",
    choiceA : "Wrong",
    choiceB : "Correct",
    choiceC : "Wrong",
    correct: "B"
  },
  {
    question : "What is js stands for ?",
    imgSrc : "https://i.postimg.cc/kGvN9yZd/js.png",
    choiceA : "Wrong",
    choiceB : "Wrong",
    choiceC : "Correct",
    correct: "C"
  }
];

// create some variables 
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; //10s
const gaugeWidth = 150;   // 150px;
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;


//render a questions
function renderQuestion() {
  
  let q = questions[runningQuestion];
  
  question.innerHTML = "<p>" + q.question + "</p>";
  qImg.innerHTML = "<img src =" + q. imgSrc + ">";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
}


// start Quiz
start.addEventListener("click", startQuiz);

function startQuiz() {
  start.style.display = "none";
  quiz.style.display = "block";
  renderQuestion();
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000); // 1s
}

// progress Render
function renderProgress() {
  for( let qIndex= 0; qIndex <= lastQuestion; qIndex++){
    progress.innerHTML += "<div class='prog' id="+ qIndex + "></div>"
  }
}

// Counter Render 
function renderCounter(){
  if( count <= questionTime){
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    count++;
  }else {
      count = 0;
      answerIsWrong();
      if ( runningQuestion < lastQuestion){
      runningQuestion++;
      renderQuestion();
      }else{
      // end the quiz and show to the score
         clearInterval(TIMER);
        scoreRender();
      }
  }
  
}


// checking Answer

function checkAnswer(answer) {
  
  if( answer == questions[runningQuestion].correct){
    // answer is correct
        score++;
    answerIsCorrect();
    // change progress color to green
  }else{
    // answer is wrong
    answerIsWrong();
    // change progress color to red
  } 
  
  count = 0;
  if( runningQuestion < lastQuestion){
    runningQuestion++;
    renderQuestion();
  }else{
    // end the quiz and show to the score
    clearInterval(TIMER);
    scoreRender();
  }
}


// answerisCorrect

function answerIsCorrect() {
  document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

function answerIsWrong() {
  document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render

function scoreRender() {
  scoreDiv.style.display = "block";
  const scorePerCent = Math.round( 100 * score / questions.length);
  
  let img = (scorePerCent >= 80) ? "https://i.postimg.cc/Kj94yZBx/5.png":
            (scorePerCent >= 60) ? "https://i.postimg.cc/15QZ9xJZ/4.png":
            (scorePerCent >= 40) ? "https://i.postimg.cc/yN5wt2kt/3.png":
            (scorePerCent >= 20) ? "https://i.postimg.cc/T1jFywCv/2.png":
              "https://i.postimg.cc/T33FwTbB/1.png";
  
  
  scoreDiv.innerHTML = "<div><img src =" + img + "></div>"; 
   scoreDiv.innerHTML += "<p>" + scorePerCent + "%" + "</p>";
}

