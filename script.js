/**
 * Test de frappe - Script principal
 */

let startTime = null,
    previousEndTime = null;
let currentWordIndex = 0;
const wordsToType = [];
let totalCorrectChars = 0;
let totalChars = 0;
let totalKeystrokes = 0;

const modeSelect = document.getElementById("mode");
const wordDisplay = document.getElementById("word-display");
const inputField = document.getElementById("input-field");
const wpmResult = document.getElementById("wpm-result");
const accuracyResult = document.getElementById("accuracy-result");
const restart = document.getElementById("mybtn");

const words = {
    easy: ["apple", "banana", "grape", "orange", "cherry"],
    medium: ["keyboard", "monitor", "printer", "charger", "battery"],
    hard: ["synchronize", "complicated", "development", "extravagant", "misconception"],
};

// Générer un mot aléatoire
const getRandomWord = (mode) => {
    const wordList = words[mode];
    return wordList[Math.floor(Math.random() * wordList.length)];
};

// Initialiser le test
const startTest = (wordCount = 25) => {
    wordsToType.length = 0;
    wordDisplay.innerHTML = "";
    currentWordIndex = 0;
    startTime = null;
    previousEndTime = null;
    totalCorrectChars = 0;
    totalChars = 0;
    totalKeystrokes = 0;

    for (let i = 0; i < wordCount; i++) {
        wordsToType.push(getRandomWord(modeSelect.value));
    }

    wordsToType.forEach((word) => {
        const wordSpan = document.createElement("span");
        wordSpan.classList.add("word");

        [...word].forEach((char) => {
            const charSpan = document.createElement("span");
            charSpan.textContent = char;
            wordSpan.appendChild(charSpan);
        });

        const spaceSpan = document.createElement("span");
        spaceSpan.textContent = " ";
        wordSpan.appendChild(spaceSpan);

        wordDisplay.appendChild(wordSpan);
    });

    inputField.value = "";
    wpmResult.textContent = "0";
    accuracyResult.textContent = "0%";
    highlightNextWord();
};

// Coloration des lettres en temps réel
const updateCurrentLetters = () => {
    const input = inputField.value;
    const wordSpans = wordDisplay.children[currentWordIndex]?.querySelectorAll("span");

    if (!wordSpans) return;

    for (let i = 0; i < wordSpans.length - 1; i++) {
        const charSpan = wordSpans[i];
        const expectedChar = charSpan.textContent;
        const typedChar = input[i];

        charSpan.classList.remove("correct", "incorrect", "border-r-2", "border-emerald-400", "animate-pulse");
        
        if (typedChar == null) {
            charSpan.classList.remove("correct", "incorrect");
        } else if (typedChar === expectedChar) {
            charSpan.classList.add("correct");
            charSpan.classList.remove("incorrect");
        } else {
            charSpan.classList.add("incorrect");
            charSpan.classList.remove("correct");
        }
    }
    
};

// Démarrer le chrono au premier input
const startTimer = () => {
    if (!startTime) startTime = Date.now();
};

// Calcul du WPM & précision
const getCurrentStats = () => {
    // S'assurer que startTime est défini pour éviter les erreurs
    if (!startTime) return { wpm: "0", accuracy: "0", correctChars: 0, wordChars: 0 };

    // Pour le WPM global, mesurer depuis le début du test
    const totalElapsedMinutes = (Date.now() - startTime) / 1000 / 60; // temps en minutes

    // Calcul du WPM (mots par minute)
    // Un "mot" standard est considéré comme 5 caractères
    const globalWpm = totalKeystrokes / 5 / totalElapsedMinutes;

    // Calcul d'accuracy corrigé pour le mot actuel
    const targetWord = wordsToType[currentWordIndex];
    const typedWord = inputField.value;
    let correctChars = 0;

    for (let i = 0; i < typedWord.length && i < targetWord.length; i++) {
        if (typedWord[i] === targetWord[i]) {
            correctChars++;
        }
    }

    const wordChars = Math.max(typedWord.length, targetWord.length);

    // Calcul de l'accuracy globale
    const globalAccuracy = ((totalCorrectChars + correctChars) / (totalChars + wordChars)) * 100;

    return {
        wpm: globalWpm.toFixed(2),
        accuracy: globalAccuracy.toFixed(2),
        correctChars: correctChars,
        wordChars: wordChars,
    };
};

// Passage au mot suivant
const updateWord = (event) => {
    if (event.key === " ") {
        if (!previousEndTime) previousEndTime = startTime;

        // Ajouter les caractères du mot complété au compteur global
        let correctCharsInCurrentWord = 0;

        // Décomposer le mot actuel en caractères
        [...wordsToType[currentWordIndex]].forEach((char, index) => {
            const typedChar = inputField.value[index];  // Récupérer le caractère tapé

            // Si le caractère est correct, on l'incrémente
            if (typedChar === char) {
                correctCharsInCurrentWord++;
            }
        });
        totalKeystrokes += correctCharsInCurrentWord;


        const stats = getCurrentStats();

        // Mise à jour des totaux après le calcul
        totalCorrectChars += stats.correctChars;
        totalChars += stats.wordChars;

        wpmResult.textContent = stats.wpm;
        accuracyResult.textContent = `${stats.accuracy}%`;

        currentWordIndex++;
        previousEndTime = Date.now();
        inputField.value = "";
        highlightNextWord();

        if (currentWordIndex >= wordsToType.length) {
            inputField.disabled = true;
            inputField.value = "Test terminé 🎉";
        }
        event.preventDefault(); // Pour éviter les espaces dans le champ
    }
};

// Highlight du mot actuel
const highlightNextWord = () => {
    const wordElements = wordDisplay.children;

    for (let i = 0; i < wordElements.length; i++) {
        wordElements[i].style.color = "white";
    }

    if (currentWordIndex < wordElements.length) {
        wordElements[currentWordIndex].style.color = "red";
    }
};

// Écouteurs
inputField.addEventListener("input", () => {
    startTimer();
    updateCurrentLetters();
});

inputField.addEventListener("keydown", updateWord);
modeSelect.addEventListener("change", () => startTest());
document.addEventListener("keydown", () => {
    inputField.focus();
    restart.classList.remove("active:scale-95");
});
restart.addEventListener("click", () => {
    restart.classList.add("active:scale-95");
    startTest();
});
// Lancer le test au chargement
startTest();
let dash = document.getElementById("todashboard")
dash.addEventListener("click",()=>{
    window.location.href = "dashboard.html";
})
