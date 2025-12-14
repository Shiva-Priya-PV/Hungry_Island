const questions = [
    {
        text: "You reach the island and see three paths. Only one is safe. A board says: “Choose the path that survivors take.” Which path do you choose?",
        img: "img2.jpg",
        options: [
            { text: "A. Path with skeletons", correct: false },
            { text: "B. Path with fresh footprints", correct: true },
            { text: "C. Path with no footprints", correct: false },
            { text: "D. Path with animal bones", correct: false }
        ],
        hint: "someone alive"
    },
    {
        text: "You find a locked door with a code: “Hungry Island has 3 tribes. Each tribe eats every 2 days. After 6 days, how many meals?”",
        img: "img3.jpg",
        options: [
            { text: "A. 3", correct: false },
            { text: "B. 6", correct: false },
            { text: "C. 9", correct: true },
            { text: "D. 12", correct: false }
        ],
        hint: "Multiply smaller number"
    },
    {
        text: "A message says: “Only even-numbered rocks are safe. The sum of rock numbers is 26.” Which pair is safe?",
        img: "img4.jpg",
        options: [
            { text: "A. 12 & 14", correct: true },
            { text: "B. 10 & 4", correct: false },
            { text: "C. 8 & 2", correct: false },
            { text: "D. 7 & 5", correct: false }
        ],
        hint: "Sum = Add"
    },
    {
        text: "You find three idols: Idol of Teeth, Idol of Fire, Idol of Smoke. A prophecy says: “Choose the one that saves you from hungry peoples”",
        img: "img5.jpg",
        options: [
            { text: "A. Teeth", correct: false },
            { text: "B. Fire", correct: true },
            { text: "C. Smoke", correct: false },
            { text: "D. All of them", correct: false }
        ],
        hint: "one that burns anything"
    },
    {
        text: "A cannibal island trap has three possible triggers: A feather, a stone, and a bone. Clue says: “Pick the object they worship”",
        img: "img6.jpg",
        options: [
            { text: "A. Feather", correct: false },
            { text: "B. Stone", correct: false },
            { text: "C. Bone", correct: true },
            { text: "D. None", correct: false }
        ],
        hint: "not a stone"
    },
    {
        text: "A cannibal chant echoes: “Two shadows walk, but only one is alive.” You see two shadows approaching. What should you do?",
        img: "img7.jpg",
        options: [
            { text: "A. Run toward them", correct: false },
            { text: "B. Light a fire", correct: false },
            { text: "C. Hide behind rocks", correct: true },
            { text: "D. Shout for help", correct: false }
        ],
        hint: "don't reveal yourself"
    },
    {
        text: "A stone puzzle says: “Cannibals fear what they cannot see, but smell what is near.” Which tool helps you avoid them?",
        img: "img8.jpg",
        options: [
            { text: "A. Torch", correct: false },
            { text: "B. Perfume", correct: false },
            { text: "C. Mud", correct: true },
            { text: "D. Sharp knife", correct: false }
        ],
        hint: "they find perfume smell"
    }
];

let currentQuestionIndex = 0;
let timeLeft = 600; // 10 minutes in seconds
let timerInterval;

// Audio
const bgMusic = document.getElementById("bg-music");

function startGame() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("start-screen").classList.remove("active");
    
    document.getElementById("game-screen").classList.remove("hidden");
    document.getElementById("game-screen").classList.add("active");

    // Start Music
    bgMusic.volume = 0.5;
    bgMusic.play().catch(error => console.log("Audio play failed, user interaction needed first."));

    // Start Timer
    timerInterval = setInterval(updateTimer, 1000);

    loadQuestion();
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    document.getElementById("timer").innerText = `${minutes}:${seconds}`;

    if (timeLeft === 0) {
        clearInterval(timerInterval);
        gameOver();
    } else {
        timeLeft--;
    }
}

function loadQuestion() {
    const q = questions[currentQuestionIndex];
    
    // Reset UI
    document.getElementById("hint-box").classList.add("hidden");
    document.getElementById("feedback-msg").innerText = "";
    document.getElementById("q-img").src = q.img;
    document.getElementById("question-text").innerText = q.text;
    document.getElementById("progress").innerText = `Q: ${currentQuestionIndex + 1}/${questions.length}`;

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.innerText = opt.text;
        btn.classList.add("btn");
        btn.onclick = () => checkAnswer(opt.correct, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(isCorrect, btnElement) {
    const feedback = document.getElementById("feedback-msg");
    const hintBox = document.getElementById("hint-box");
    const hintText = document.getElementById("hint-text");

    if (isCorrect) {
        // Correct Answer
        btnElement.style.backgroundColor = "#2ecc71"; // Green
        btnElement.style.borderColor = "#2ecc71";
        feedback.style.color = "#2ecc71";
        feedback.innerText = "CORRECT. MOVING FORWARD...";
        
        // Disable all buttons to prevent double clicks
        const allBtns = document.querySelectorAll(".options-grid .btn");
        allBtns.forEach(b => b.disabled = true);

        // Wait 1 second then go next
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                gameWin();
            }
        }, 1500);

    } else {
        // Incorrect Answer
        btnElement.classList.add("shake-anim");
        setTimeout(() => btnElement.classList.remove("shake-anim"), 500);
        
        feedback.style.color = "red";
        feedback.innerText = "WRONG CHOICE.";
        
        // Show Hint
        hintText.innerText = questions[currentQuestionIndex].hint;
        hintBox.classList.remove("hidden");
    }
}

function gameOver() {
    document.getElementById("game-screen").classList.add("hidden");
    document.getElementById("game-over-screen").classList.remove("hidden");
    document.getElementById("game-over-screen").classList.add("active");
}

function gameWin() {
    clearInterval(timerInterval);
    document.getElementById("game-screen").classList.add("hidden");
    document.getElementById("end-screen").classList.remove("hidden");
    document.getElementById("end-screen").classList.add("active");
}
