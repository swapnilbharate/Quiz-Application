const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");

const quizContainer = document.getElementById("quiz");
const startScreen = document.getElementById("start-screen");
const resultScreen = document.getElementById("result-screen");

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 50;
let timer;

const questions = [
    { question: "What is the capital of Japan?", answers: [{ text: "Seoul", correct: false }, { text: "Tokyo", correct: true }, { text: "Beijing", correct: false }, { text: "Bangkok", correct: false }] },
    { question: "Which planet is known as the Red Planet?", answers: [{ text: "Mars", correct: true }, { text: "Venus", correct: false }, { text: "Jupiter", correct: false }, { text: "Saturn", correct: false }] },
    { question: "Who wrote 'Hamlet'?", answers: [{ text: "Charles Dickens", correct: false }, { text: "William Shakespeare", correct: true }, { text: "Jane Austen", correct: false }, { text: "Mark Twain", correct: false }] },
    { question: "What is the hardest natural substance on Earth?", answers: [{ text: "Gold", correct: false }, { text: "Diamond", correct: true }, { text: "Iron", correct: false }, { text: "Silver", correct: false }] },
    { question: "Which gas do plants absorb?", answers: [{ text: "Oxygen", correct: false }, { text: "Carbon Dioxide", correct: true }, { text: "Nitrogen", correct: false }, { text: "Hydrogen", correct: false }] },
    { question: "What is the largest ocean on Earth?", answers: [{ text: "Atlantic Ocean", correct: false }, { text: "Pacific Ocean", correct: true }, { text: "Indian Ocean", correct: false }, { text: "Arctic Ocean", correct: false }] },
    { question: "Which animal is known as the King of the Jungle?", answers: [{ text: "Tiger", correct: false }, { text: "Elephant", correct: false }, { text: "Lion", correct: true }, { text: "Cheetah", correct: false }] },
    { question: "How many continents are there?", answers: [{ text: "5", correct: false }, { text: "6", correct: false }, { text: "7", correct: true }, { text: "8", correct: false }] },
    { question: "What is the boiling point of water?", answers: [{ text: "90°C", correct: false }, { text: "100°C", correct: true }, { text: "120°C", correct: false }, { text: "80°C", correct: false }] },
    { question: "Who discovered gravity?", answers: [{ text: "Albert Einstein", correct: false }, { text: "Isaac Newton", correct: true }, { text: "Galileo Galilei", correct: false }, { text: "Nikola Tesla", correct: false }] }
];

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    startScreen.classList.add("hide");
    quizContainer.classList.remove("hide");
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 50;
    startTimer();
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        endQuiz();
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add("hide");
    answerButtons.innerHTML = "";
}

function selectAnswer(e) {
    const correct = e.target.dataset.correct;
    if (correct) score++;
    document.querySelectorAll(".btn").forEach(btn => btn.classList.add(btn.dataset.correct ? "correct" : "wrong"));
    nextButton.classList.remove("hide");
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time: ${timeLeft}s`;
        if (timeLeft <= 0) endQuiz();
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    quizContainer.classList.add("hide");
    resultScreen.classList.remove("hide");
    scoreElement.innerText = score;
}

function restartQuiz() {
    resultScreen.classList.add("hide");
    startScreen.classList.remove("hide");
}
