const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "London"],
        answer: "Paris"
    },
    {
        question: "Which language is used for web development?",
        options: ["Python", "JavaScript", "C++", "Java"],
        answer: "JavaScript"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    },
    {
        question: "What is 5 + 7?",
        options: ["10", "12", "11", "14"],
        answer: "12"
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const quizEl = document.getElementById("quiz");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");
const progressEl = document.getElementById("progress");

// Load the question
function loadQuestion() {
    const currentQuiz = quizData[currentQuestion];
    questionEl.textContent = currentQuiz.question;
    optionsEl.innerHTML = "";
    selectedOption = null;
    nextBtn.disabled = true;

    progressEl.textContent = `Question ${currentQuestion + 1} / ${quizData.length}`;

    currentQuiz.options.forEach(option => {
        const li = document.createElement("li");
        li.textContent = option;
        li.addEventListener("click", () => selectOption(li, currentQuiz.answer));
        optionsEl.appendChild(li);
    });
}

// Handle option selection
function selectOption(li, correctAnswer) {
    if (selectedOption) return; // prevent changing selection
    selectedOption = li;

    const options = optionsEl.querySelectorAll("li");
    options.forEach(option => option.classList.add("disabled"));

    if (li.textContent === correctAnswer) {
        li.classList.add("correct");
        score++;
    } else {
        li.classList.add("wrong");
        // highlight correct option
        options.forEach(option => {
            if (option.textContent === correctAnswer) {
                option.classList.add("correct");
            }
        });
    }

    nextBtn.disabled = false;
}

// Handle next button
nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

// Show result
function showResult() {
    quizEl.classList.add("hide");
    resultEl.classList.remove("hide");
    scoreEl.textContent = `${score} / ${quizData.length}`;
}

// Restart quiz
restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    quizEl.classList.remove("hide");
    resultEl.classList.add("hide");
    loadQuestion();
});

loadQuestion();
