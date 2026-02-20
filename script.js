// DOM ELEMENTS
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

//Quiz Questions
const quizQuestions = [
    {
        question: "What was the earlier name of Java?",
        answers: [
            { text: "Kotlin", correct: false },
            { text: "Javac", correct: false },
            { text: "Oak", correct: true },
            { text: "Swift", correct: false },
        ],
    },
    {
        question: "How to instantiate an abstract class in java?",
        answers: [
            { text: "Classname obj = new Classname();", correct: false },
            { text: "Classname obj;", correct: false },
            { text: "Classname obj = new obj;", correct: false },
            { text: "Cannot be instantiated", correct: true },
        ],
    },
    {
        question: "Which keyword is used in child class to call the instance variables of parent class?",
        answers: [
            { text: "Super", correct: true },
            { text: "this", correct: false },
            { text: "Parent", correct: false },
            { text: "extends", correct: false },
        ],

    },
    {
        question: "Which is an example of Runtime polymorphism?",
        answers: [
            { text: "Method Overloading", correct: false },
            { text: "instantiation", correct: false },
            { text: "Constructor overridding", correct: true },
            { text: "Constructor overloading", correct: false },
        ],
    },
    {
        question: "Which is an example of Procedural Oriented Programming Language?",
        answers: [
            { text: "Java", correct: false },
            { text: "C++", correct: false },
            { text: "C", correct: true },
            { text: "Python", correct: false },
        ],
    }
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;
// console.log();

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    //reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}
function showQuestion() {
    //reset state
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        //What is dataset? Used to store some custom data
        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    });

}


function selectAnswer(event){
    //optimisation check
    if(answersDisabled) return

    answersDisabled = true;

    const selectedButton = event.target;

    const isCorrect = selectedButton.dataset.correct === "true";

    // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
    Array.from(answersContainer.children).forEach((button) => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }else if(button === selectedButton){
            button.classList.add("incorrect");
        }
    });

    if(isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        // Check if there are more questions or if the quiz is over
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion();
        }else{
            showResults();
        }
    }, 1000);
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    
    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100;

    if(percentage === 100){
        resultMessage.textContent = "Perfect! You're a genius!";
    }else if(percentage >= 80){
        resultMessage.textContent = "Great job! You know your stuff!";
    }else if(percentage >= 60){
        resultMessage.textContent = "Good effort! Keep learning!";
    }else if(percentage >= 40){
        resultMessage.textContent = "Not bad! Try again to improve!";
    }else{
        resultMessage.textContent = "Keep studying! You'll get better!";
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");

    startQuiz();
}