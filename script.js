const quizData = {
    general: [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            answer: "Paris"
        },
        {
            question: "What is the largest continent?",
            options: ["Africa", "Asia", "Europe", "Australia"],
            answer: "Asia"
        },
        {
            question: "What is the currency of Japan?",
            options: ["Yen", "Dollar", "Euro", "Won"],
            answer: "Yen"
        },
        {
            question: "Who wrote 'Hamlet'?",
            options: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "Mark Twain"],
            answer: "William Shakespeare"
        },
        {
            question: "Which planet is known as the Blue Planet?",
            options: ["Mars", "Earth", "Venus", "Jupiter"],
            answer: "Earth"
        }
    ],
    science: [
        {
            question: "What is the chemical symbol for water?",
            options: ["O2", "H2O", "CO2", "NaCl"],
            answer: "H2O"
        },
        {
            question: "What planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            answer: "Mars"
        },
        {
            question: "What is the powerhouse of the cell?",
            options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
            answer: "Mitochondria"
        },
        {
            question: "What gas do plants absorb from the atmosphere?",
            options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
            answer: "Carbon Dioxide"
        },
        {
            question: "What is the speed of light?",
            options: ["300,000 km/s", "150,000 km/s", "400,000 km/s", "600,000 km/s"],
            answer: "300,000 km/s"
        }
    ]
};

let score = 0;
let selectedCategory = '';

function loadQuiz() {
    const quizContainer = document.getElementById("quiz");
    const questions = quizData[selectedCategory];
    quizContainer.innerHTML = questions.map((currentQuestion, index) => `
        <div class="question">
            <p>${index + 1}. ${currentQuestion.question}</p>
            <ul class="options">
                ${currentQuestion.options.map(option => `
                    <li>
                        <input type="radio" name="question${index}" value="${option}"> ${option}
                    </li>`).join('')}
            </ul>
        </div>
    `).join('');
}

function submitAnswers() {
    const questions = quizData[selectedCategory];
    questions.forEach((currentQuestion, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && selectedOption.value === currentQuestion.answer) {
            score++;
        }
    });
    displayResult();
}

function displayResult() {
    const scoreContainer = document.getElementById("score");
    const perfectScoreMessage = document.getElementById("perfect-score-message");
    
    scoreContainer.innerHTML = `You scored ${score} out of ${quizData[selectedCategory].length}`;

    // Check for full score
    if (score === quizData[selectedCategory].length) {
        perfectScoreMessage.innerHTML = "Excellent! You got full marks!";
    } else {
        perfectScoreMessage.innerHTML = ""; // Clear message if not full score
    }

    document.getElementById("quiz").style.display = 'none';
    document.getElementById("submit").style.display = 'none';
    document.getElementById("category-select").style.display = 'none'; // Hide category select
    document.getElementById("result").style.display = 'block';
}

function resetQuiz() {
    score = 0;
    selectedCategory = ''; // Reset selected category
    document.getElementById("quiz").style.display = 'none';
    document.getElementById("submit").style.display = 'none';
    document.getElementById("result").style.display = 'none';
    document.getElementById("category-select").style.display = 'block'; // Show category select
}

document.getElementById("category-select").addEventListener("change", function() {
    selectedCategory = this.value;
    if (selectedCategory) {
        loadQuiz();
        document.getElementById("submit").style.display = 'block';
        document.getElementById("result").style.display = 'none';
        document.getElementById("quiz").style.display = 'block'; // Show quiz
    }
});

document.getElementById("submit").addEventListener("click", submitAnswers);
document.getElementById("try-again").addEventListener("click", resetQuiz);
