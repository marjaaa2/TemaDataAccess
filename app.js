// JSON data
const quizData = {
    "quiz": {
        "q1": {
            "question": "Care dintre acestea este o echipă NBA?",
            "options": ["New York Bulls", "Los Angeles Kings", "Golden State Warriros", "Huston Rocket"],
            "answer": "Huston Rocket"
        },
        "q2": {
            "question": "'Namaste' este formulă de salut în care dintre limbile vorbite în Asia?",
            "options": ["Hindi", "Mandarin", "Nepalese", "Thai"],
            "answer": "Hindi"
        },
        "q3": {
            "question": "Prin ce capitală europeană trece râul Spree?",
            "options": ["Berlin", "Paris", "Rome", "London"],
            "answer": "Berlin"
        },
        "q4": {
            "question": "Ce pictor celebru a avut o perioadă roz și una albastră?",
            "options": ["Pablo Picasso", "Vincent van Gogh", "Salvador Dalí", "Edgar Degas"],
            "answer": "Pablo Picasso"
        }
    }
};

// Creăm o funcție pentru a genera testul/quizul
function createQuiz(quiz) {
    const quizContainer = document.getElementById('quiz-div');
    quizContainer.innerHTML = ''; // Șterge orice conținut anterior (dacă există)

    Object.keys(quiz).forEach(key => {
        const questionData = quiz[key];
        const questionElement = document.createElement('div');
        questionElement.className = 'question';

        const questionTitle = document.createElement('h3');
        questionTitle.textContent = questionData.question;
        questionElement.appendChild(questionTitle);

        questionData.options.forEach(option => {
            const optionLabel = document.createElement('label');
            optionLabel.textContent = option;

            const optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.name = key;
            optionInput.value = option;

            // Vezi dacă acesta a fost răspunsul utilizatorului
            const storedAnswer = localStorage.getItem(key);
            if (storedAnswer === option) {
                optionInput.checked = true;
            }

            optionLabel.insertBefore(optionInput, optionLabel.firstChild);
            questionElement.appendChild(optionLabel);
            questionElement.appendChild(document.createElement('br'));
        });

        quizContainer.appendChild(questionElement);
    });
}

// Salvăm răspunsurile local
function submitQuiz() {
    const quizContainer = document.getElementById('quiz-div');
    const inputs = quizContainer.querySelectorAll('input[type="radio"]:checked');

    inputs.forEach(input => {
        localStorage.setItem(input.name, input.value);
    });

    alert('Ți se salvează răspunsurile!');

    // Oferim răspunsurile corecte
    Object.keys(quizData.quiz).forEach(key => {
        const questionData = quizData.quiz[key];
        const correctAnswerText = document.createElement('p');
        correctAnswerText.textContent = `Răspunsul corect: ${questionData.answer}`;
        const questionElement = document.querySelector(`input[name="${key}"]`).closest('.question');
        questionElement.appendChild(correctAnswerText);
    });
}

// Ștergem toate răspunsurile și recreăm testul
function clearAnswers() {
    Object.keys(quizData.quiz).forEach(key => {
        localStorage.removeItem(key); // Remove each stored answer from local storage
    });

    createQuiz(quizData.quiz); // Generează din nou testul, fără răspunsuri
    alert('Ți se șterg răspunsurile!');
}

// Reluăm testul
document.addEventListener('DOMContentLoaded', () => {
    createQuiz(quizData.quiz);
});
