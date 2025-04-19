/**
 * Test de frappe - Script principal
 */
export const modeSelect = document.getElementById("mode");
export const wordDisplay = document.getElementById("word-display");
export const inputField = document.getElementById("input-field");
const languageSelect = document.getElementById("languageSelect");
const message = document.getElementsByClassName("message")[0];
import { wordsEng, wordsFr, wordsMlg } from "./word.js";

let blured = false;

const applyBlur = () => {
        wordDisplay.classList.add("blur-md");
        blured = true;
        message.classList.add("bg-sky-500");
        message.classList.remove("opacity-0");
    };
    const removeBlur = () => {
        wordDisplay.classList.remove("blur-md");
        blured = false;
        message.classList.remove("bg-sky-500");
        message.classList.add("opacity-0");
        inputField.focus();
    };
let startTime = null,
    previousEndTime = null;
let currentWordIndex = 0;
const wordsToType = [];
let totalCorrectChars = 0;
let totalChars = 0;
let totalKeystrokes = 0;

const wpmResult = document.getElementById("wpm-result");
const accuracyResult = document.getElementById("accuracy-result");
const next = document.getElementById("mybtn");
// Générer un mot aléatoire
const getRandomWord = (mode) => {
    let wordList = [];
    if (languageSelect.value === "FR") {
        wordList = wordsFr[mode];
    } else if (languageSelect.value === "ENG") {
        wordList = wordsEng[mode];
    } else if (languageSelect.value === "MLG") {
        wordList = wordsMlg[mode];
    }
    return wordList[Math.floor(Math.random() * wordList.length)];
};

// Initialiser le test
export const startTest = (wordCount = 105) => {
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
    inputField.focus();

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

        charSpan.classList.remove("correct", "incorrect", "border-r-2", "border-emerald-400");

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
    if (!startTime) return { wpm: "0", accuracy: "0", correctChars: 0, wordChars: 0 };
    const totalElapsedMinutes = (Date.now() - startTime) / 1000 / 60;
    const globalWpm = totalKeystrokes / 5 / totalElapsedMinutes;

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
            if (e.key === "Enter" && document.activeElement === next) {
                inputField.disabled = false;
                inputField.value = "";
                startTest();
                inputField.focus();
                document.removeEventListener("keydown", handleEnter);
            }
        };
        document.addEventListener("keydown", handleEnter);
        inputField.focus();

    }

    const wordChars = Math.max(typedWord.length, targetWord.length);
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

        let correctCharsInCurrentWord = 0;
        [...wordsToType[currentWordIndex]].forEach((char, index) => {
            const typedChar = inputField.value[index];
            if (typedChar === char) {
                correctCharsInCurrentWord++;
            }
        });
        totalKeystrokes += correctCharsInCurrentWord;

        const stats = getCurrentStats();

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
        event.preventDefault();
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

        wordElements[currentWordIndex].scrollIntoView({
            behavior: "smooth",
            block: "center",
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
modeSelect.addEventListener("change", () => {
    localStorage.setItem("preferredMode", modeSelect.value);
    startTest();
    inputField.focus();
});

next.addEventListener("click", () => {
    next.classList.add("active:scale-95");
    startTest();
    inputField.focus();
});

languageSelect.addEventListener("change", () => {
    localStorage.setItem("preferredLanguage", languageSelect.value);
    startTest();
    applyBlur();
});

window.addEventListener("DOMContentLoaded", () => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    const savedMode = localStorage.getItem("preferredMode");

    if (savedLanguage) {
        languageSelect.value = savedLanguage;
    }
    if (savedMode) {
        modeSelect.value = savedMode;
    }
    startTest();
});
document.addEventListener("keydown", (e) => {
    if (blured && (e.key === "Enter")) {
        startTest();
        removeBlur();
    }
});
// theme
function applyThemeFromLocalStorage() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.className = savedTheme;
    }
}             
window.onload = applyThemeFromLocalStorage;const buttons = document.querySelectorAll(".theme-btn");

buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const theme = event.target.id;
        document.documentElement.className = theme;
        localStorage.setItem("theme", theme);

        localStorage.setItem("preferredLanguage", languageSelect.value);
        startTest();
        applyBlur();
    });
});
