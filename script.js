let questions = [];

fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        startQuiz();
    })
    .catch(error => console.error('Error fetching questions:', error));

function startQuiz() {
    let currentQuestionIndex = 0;
    let score = 0;

    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options");
    const nextButton = document.getElementById("next-button");

    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        const converter = new showdown.Converter();
        const html = converter.makeHtml(currentQuestion.question)
        questionText.innerHTML = html;

        optionsContainer.innerHTML = "";

        currentQuestion.options.forEach((option) => {
            const optionElement = document.createElement("button");
            optionElement.textContent = option;
            optionElement.addEventListener("click", () => checkAnswer(option, currentQuestion.correctAnswer));
            optionsContainer.appendChild(optionElement);
        });
    }

    function checkAnswer(selectedOption, correctAnswer) {
        if (selectedOption === correctAnswer) {
            score++;
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            displayResult();
        }
    }

    function displayResult() {
        questionText.textContent = `You scored ${score} out of ${questions.length}!`;
        optionsContainer.innerHTML = "";
        nextButton.style.display = "none";
    }

    loadQuestion();

    nextButton.addEventListener("click", () => {
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            displayResult();
        }
    });
}

