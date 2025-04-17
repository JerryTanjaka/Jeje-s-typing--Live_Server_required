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
const next = document.getElementById("mybtn");
import { words } from "./ASSETS/js/word.js";

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
    if (currentWordIndex === wordsToType.length - 1) {
        inputField.disabled = true;
        next.focus();
        const handleEnter = (e) => {
            if (e.key === "Enter") {
                inputField.disabled = false;
                inputField.value = "";
                inputField.focus();
                startTest();
                document.removeEventListener("keydown", handleEnter);
            }
        };

        document.addEventListener("keydown", handleEnter);
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
            const typedChar = inputField.value[index]; // Récupérer le caractère tapé

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

    // Reset all word colors to white
    for (let i = 0; i < wordElements.length; i++) {
        wordElements[i].style.color = "white";
    }

    // Check if the current word index is within bounds
    if (currentWordIndex < wordElements.length) {
        wordElements[currentWordIndex].style.color = "red";

        // Scroll every 50 characters
        wordElements[currentWordIndex].scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start",
        });
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
    next.classList.remove("active:scale-95");
});
next.addEventListener("click", () => {
    next.classList.add("active:scale-95");
    startTest();
});
// Lancer le test au chargement
startTest();
let dash = document.getElementById("todashboard");
dash.addEventListener("click", () => {
    window.location.href = "dashboard.html";
});
mode.addEventListener("change", () => {
    inputField.focus();
});
if (currentWordIndex == words(mode)) next.focus();
