 // Audio Elements
    const correctSound = new Audio('https://assets.mixkit.co/sfx/preview/296/296.wav');
    const wrongSound = new Audio('https://assets.mixkit.co/sfx/preview/257/257.wav');
    const winSound = new Audio('https://assets.mixkit.co/sfx/preview/2965/2965.wav');

    const questions = [
      { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Transfer Machine Language", "Hyperlink Text Management", "Home Tool Markup Language"], correct: 0 },
      { q: "Which tag is used to create a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], correct: 1 },
      { q: "Which CSS property changes text color?", options: ["text-color", "color", "font-color", "text-style"], correct: 1 },
      { q: "What does 'flex' in CSS stand for?", options: ["Flexible Box", "Flex Layout", "Flexible Display", "Flex Container"], correct: 0 },
      { q: "Which JavaScript keyword prevents reassignment?", options: ["var", "let", "const", "static"], correct: 2 },
      { q: "Correct way to write a comment in JavaScript?", options: ["// comment", "<!-- comment -->", "/* comment */", "Both // and /* */"], correct: 3 },
      { q: "How do you print 'Hello World' in C?", options: ["printf('Hello World');", "cout << 'Hello World';", "System.out.print", "echo 'Hello World'"], correct: 0 },
      { q: "Which operator accesses structure members in C++?", options: [".", "->", "::", "Both . and ->"], correct: 3 },
      { q: "What is the usual size of 'int' in modern C++?", options: ["2 bytes", "4 bytes", "8 bytes", "It depends"], correct: 1 },
      { q: "Which is NOT a programming language?", options: ["Python", "HTML", "Java", "C++"], correct: 1 },
      // Extra 15 Questions
      { q: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], correct: 1 },
      { q: "Which HTML tag is used for the largest heading?", options: ["<h1>", "<head>", "<h6>", "<heading>"], correct: 0 },
      { q: "How do you declare a variable in JavaScript (ES6)?", options: ["var x;", "let x;", "const x;", "Both let and const"], correct: 3 },
      { q: "What is the correct syntax for a function in JavaScript?", options: ["function myFunc()", "def myFunc()", "func myFunc()", "void myFunc()"], correct: 0 },
      { q: "Which property is used to change the background color in CSS?", options: ["bg-color", "background-color", "color-background", "back-color"], correct: 1 },
      { q: "In C, what is the correct way to end a statement?", options: [".", ":", ";", ","], correct: 2 },
      { q: "What does '++' operator do in C++?", options: ["Subtract 1", "Add 1", "Multiply by 2", "Divide by 2"], correct: 1 },
      { q: "Which loop is best when you know the number of iterations?", options: ["while", "do-while", "for", "foreach"], correct: 2 },
      { q: "What is the parent element of all HTML elements?", options: ["<body>", "<html>", "<head>", "<root>"], correct: 1 },
      { q: "Which keyword is used to create a class in JavaScript?", options: ["class", "Class", "function", "object"], correct: 0 },
      { q: "What is the use of <br> tag in HTML?", options: ["Bold text", "Line break", "Break paragraph", "Bold row"], correct: 1 },
      { q: "Which CSS selector targets elements by id?", options: [".id", "#id", "id", "*id"], correct: 1 },
      { q: "What does 'console.log()' do in JavaScript?", options: ["Print to screen", "Print to console", "Save to file", "Show alert"], correct: 1 },
      { q: "In C++, how do you create a single line comment?", options: ["//", "/* */", "<!-- -->", "#"], correct: 0 },
      { q: "What is the default value of a boolean variable in C++?", options: ["true", "false", "0", "null"], correct: 1 }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let streak = 0;
    let xp = 240;
    let level = 1;
    let timeLeft = 20;           // ← Change this value to adjust timer (15, 20, 45 etc.)
    let timerInterval;
    let hintUsed = false;

    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options');
    const nextBtn = document.getElementById('next-btn');
    const timerEl = document.getElementById('timer');
    const xpEl = document.getElementById('xp');
    const levelEl = document.getElementById('level');
    const hintBtn = document.getElementById('hint-btn');
    const quizContainer = document.getElementById('quiz-container');
    const resultScreen = document.getElementById('result-screen');
    const finalScoreEl = document.getElementById('final-score');
    const finalTextEl = document.getElementById('final-text');

    function startTimer() {
      timeLeft = 20;
      timerEl.textContent = timeLeft;
      clearInterval(timerInterval);

      timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 5) timerEl.style.color = '#ef4444';

        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          handleTimeUp();
        }
      }, 1000);
    }

    function handleTimeUp() {
      document.querySelectorAll('.option').forEach(opt => opt.style.pointerEvents = 'none');
      const correctIndex = questions[currentQuestionIndex].correct;
      document.querySelectorAll('.option')[correctIndex].classList.add('correct');
      nextBtn.style.display = 'block';
      streak = 0;
    }

    function loadQuestion() {
      const q = questions[currentQuestionIndex];
      questionText.textContent = q.q;
      optionsContainer.innerHTML = '';

      q.options.forEach((option, i) => {
        const div = document.createElement('div');
        div.classList.add('option');
        div.textContent = option;
        div.onclick = () => selectAnswer(i, div);
        optionsContainer.appendChild(div);
      });

      nextBtn.style.display = 'none';
      startTimer();
    }

    function selectAnswer(selectedIndex, element) {
      clearInterval(timerInterval);
      const correctIndex = questions[currentQuestionIndex].correct;
      const timeBonus = Math.floor(timeLeft / 2);

      document.querySelectorAll('.option').forEach(opt => opt.style.pointerEvents = 'none');

      if (selectedIndex === correctIndex) {
        element.classList.add('correct');
        score += 10 + timeBonus;
        streak++;
        xp += 15 + timeBonus;
        correctSound.play();

        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } else {
        element.classList.add('incorrect');
        document.querySelectorAll('.option')[correctIndex].classList.add('correct');
        wrongSound.play();
        streak = 0;
      }

      xpEl.textContent = xp;
      if (xp >= 500) { level++; xp = 100; levelEl.textContent = level; }

      nextBtn.style.display = 'block';
    }

    nextBtn.addEventListener('click', () => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        loadQuestion();
      } else {
        showResult();
      }
    });

    function showResult() {
      clearInterval(timerInterval);
      quizContainer.style.display = 'none';
      resultScreen.style.display = 'block';

      finalScoreEl.textContent = score;

      if (score >= 200) {
        finalTextEl.textContent = "Outstanding! You are a true CodeBlade Master, Preet! ⚔️";
        winSound.play();
        confetti({ particleCount: 300, spread: 100 });
      } else if (score >= 150) {
        finalTextEl.textContent = "Excellent Work, Preet! Keep it up!";
      } else {
        finalTextEl.textContent = "Good effort, Preet! Practice more to improve.";
      }
    }

    hintBtn.addEventListener('click', () => {
      if (hintUsed) return;
      hintUsed = true;
      hintBtn.style.opacity = '0.4';
      hintBtn.textContent = "Hint Used";

      const correctIndex = questions[currentQuestionIndex].correct;
      document.querySelectorAll('.option')[correctIndex].style.borderColor = '#22c55e';
    });

    function restartQuiz() {
      currentQuestionIndex = 0;
      score = 0;
      streak = 0;
      hintUsed = false;
      quizContainer.style.display = 'block';
      resultScreen.style.display = 'none';
      hintBtn.style.opacity = '1';
      hintBtn.textContent = '💡 Hint (1 left)';
      loadQuestion();
    }

    // Start the quiz
    window.onload = loadQuestion;