// ========================================
// Heritage Explorer Quiz Logic
// ========================================

// Quiz Questions Database
const quizQuestions = [
    {
        question: "In which century was Sigiriya Rock Fortress built?",
        answers: [
            "3rd Century BC",
            "5th Century AD",
            "12th Century AD",
            "15th Century AD"
        ],
        correct: 1,
        explanation: "Sigiriya was built by King Kasyapa in the 5th century AD (477-495 AD)."
    },
    {
        question: "What is housed in the Temple of the Sacred Tooth Relic in Kandy?",
        answers: [
            "Ancient manuscripts",
            "A tooth relic of Lord Buddha",
            "Royal crown jewels",
            "Historical paintings"
        ],
        correct: 1,
        explanation: "The temple houses the sacred tooth relic of Lord Buddha, making it one of the most sacred Buddhist sites."
    },
    {
        question: "Which colonial power built the Galle Fort?",
        answers: [
            "British",
            "Portuguese",
            "Dutch",
            "Spanish"
        ],
        correct: 2,
        explanation: "Galle Fort was built by the Dutch in the 17th century, though it was initially constructed by the Portuguese."
    },
    {
        question: "What is the name of the sacred tree in Anuradhapura?",
        answers: [
            "Bodhi Tree (Sri Maha Bodhi)",
            "Banyan Tree",
            "Sacred Fig",
            "Neem Tree"
        ],
        correct: 0,
        explanation: "The Sri Maha Bodhi tree in Anuradhapura is believed to be grown from a cutting of the original Bodhi tree under which Buddha attained enlightenment."
    },
    {
        question: "How many UNESCO World Heritage Sites does Sri Lanka have?",
        answers: [
            "5",
            "6",
            "8",
            "10"
        ],
        correct: 2,
        explanation: "Sri Lanka has 8 UNESCO World Heritage Sites - 6 cultural and 2 natural."
    },
    {
        question: "What are the famous Sigiriya frescoes known as?",
        answers: [
            "The Queens",
            "The Apsaras (Cloud Maidens)",
            "The Dancers",
            "The Goddesses"
        ],
        correct: 1,
        explanation: "The Sigiriya frescoes depict the Apsaras or 'Cloud Maidens' and are masterpieces of ancient art."
    },
    {
        question: "Anuradhapura served as the capital of Sri Lanka for how many centuries?",
        answers: [
            "5 centuries",
            "8 centuries",
            "13 centuries",
            "20 centuries"
        ],
        correct: 2,
        explanation: "Anuradhapura was the capital for approximately 13 centuries from the 4th century BC to the 11th century AD."
    },
    {
        question: "What is the main architectural feature at the entrance of Sigiriya?",
        answers: [
            "Elephant Gate",
            "Lion's Gate (Lion's Paws)",
            "Dragon Gate",
            "Peacock Gate"
        ],
        correct: 1,
        explanation: "The famous Lion's Gate with massive lion paws carved from rock marks the entrance to Sigiriya's upper palace."
    },
    {
        question: "What festival is famously celebrated in Kandy annually?",
        answers: [
            "Vesak Festival",
            "Esala Perahera",
            "Poson Festival",
            "Duruthu Perahera"
        ],
        correct: 1,
        explanation: "The Esala Perahera is a grand festival held annually in Kandy, featuring decorated elephants, dancers, and drummers."
    },
    {
        question: "What was Sigiriya originally called?",
        answers: [
            "Rock Mountain",
            "Lion Rock",
            "King's Mountain",
            "Cloud Fortress"
        ],
        correct: 1,
        explanation: "Sigiriya means 'Lion Rock' in Sinhala, named after the massive lion structure at its entrance."
    }
];

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let answeredQuestions = 0;

// Start Quiz
function startQuiz() {
    document.getElementById('quizStart').style.display = 'none';
    document.getElementById('quizQuestion').style.display = 'block';
    document.getElementById('quizResults').style.display = 'none';
    
    currentQuestionIndex = 0;
    score = 0;
    answeredQuestions = 0;
    
    loadQuestion();
}

// Load Question
function loadQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('currentScore').textContent = score;
    
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = progress + '%';
    progressBar.textContent = Math.round(progress) + '%';
    
    // Load answers
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'btn btn-outline-secondary btn-lg text-start p-3';
        button.innerHTML = `<strong>${String.fromCharCode(65 + index)}.</strong> ${answer}`;
        button.onclick = () => selectAnswer(index);
        answersContainer.appendChild(button);
    });
}

// Select Answer
function selectAnswer(selectedIndex) {
    const question = quizQuestions[currentQuestionIndex];
    const buttons = document.querySelectorAll('#answersContainer button');
    
    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);
    
    // Check if correct
    if (selectedIndex === question.correct) {
        buttons[selectedIndex].classList.remove('btn-outline-secondary');
        buttons[selectedIndex].classList.add('btn-success');
        buttons[selectedIndex].innerHTML += ' <i class="bi bi-check-circle-fill float-end"></i>';
        score++;
    } else {
        buttons[selectedIndex].classList.remove('btn-outline-secondary');
        buttons[selectedIndex].classList.add('btn-danger');
        buttons[selectedIndex].innerHTML += ' <i class="bi bi-x-circle-fill float-end"></i>';
        
        // Show correct answer
        buttons[question.correct].classList.remove('btn-outline-secondary');
        buttons[question.correct].classList.add('btn-success');
        buttons[question.correct].innerHTML += ' <i class="bi bi-check-circle-fill float-end"></i>';
    }
    
    // Update score display
    document.getElementById('currentScore').textContent = score;
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuestionIndex++;
        answeredQuestions++;
        
        if (currentQuestionIndex < quizQuestions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 2000);
}

// Show Results
function showResults() {
    document.getElementById('quizQuestion').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
    
    const percentage = (score / quizQuestions.length) * 100;
    
    // Set icon and title based on score
    let icon, title, message;
    
    if (percentage >= 80) {
        icon = '<i class="bi bi-trophy-fill text-warning" style="font-size: 5rem;"></i>';
        title = 'Outstanding!';
        message = 'You\'re a true heritage expert! Excellent knowledge of Sri Lanka\'s cultural treasures.';
    } else if (percentage >= 60) {
        icon = '<i class="bi bi-star-fill text-warning" style="font-size: 5rem;"></i>';
        title = 'Great Job!';
        message = 'Well done! You have a good understanding of Sri Lanka\'s heritage sites.';
    } else if (percentage >= 40) {
        icon = '<i class="bi bi-hand-thumbs-up-fill text-primary" style="font-size: 5rem;"></i>';
        title = 'Good Effort!';
        message = 'Not bad! Keep exploring to learn more about these magnificent sites.';
    } else {
        icon = '<i class="bi bi-book text-secondary" style="font-size: 5rem;"></i>';
        title = 'Keep Learning!';
        message = 'There\'s so much to discover! Explore the site pages to learn more.';
    }
    
    document.getElementById('resultIcon').innerHTML = icon;
    document.getElementById('resultTitle').textContent = title;
    document.getElementById('resultMessage').textContent = message;
    document.getElementById('finalScore').textContent = score;
    document.getElementById('correctAnswers').textContent = score;
    document.getElementById('wrongAnswers').textContent = quizQuestions.length - score;
}

// Restart Quiz
function restartQuiz() {
    startQuiz();
}
