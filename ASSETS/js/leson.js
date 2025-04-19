import { wordsEng, wordsFr, wordsMlg, lessonsContent } from "./word.js";

export const modeSelect = document.getElementById("mode");
export const wordDisplay = document.getElementById("word-display");
export const inputField = document.getElementById("input-field");
const languageSelect = document.getElementById("languageSelect") || { value: "FR" };
const wpmResult = document.getElementById("wpm-result");
const accuracyResult = document.getElementById("accuracy-result");

let startTime = null,
    currentWordIndex = 0;
const wordsToType = [];
let totalCorrectChars = 0;
let totalChars = 0;
let totalKeystrokes = 0;

const getCurrentLessonKey = () => {
    const path = window.location.pathname;
    const pageName = path.substring(path.lastIndexOf("/") + 1, path.lastIndexOf(".html"));
    return pageName;
};

const getRandomWord = (mode) => {
    if (languageSelect.value === "FR") return wordsFr[mode];
    if (languageSelect.value === "ENG") return wordsEng[mode];
    if (languageSelect.value === "MLG") return wordsMlg[mode];
    return [];
};

export const startTest = (wordCount = 105) => {
    wordsToType.length = 0;
    wordDisplay.innerHTML = "";
    currentWordIndex = 0;
    startTime = null;
    totalCorrectChars = 0;
    totalChars = 0;
    totalKeystrokes = 0;

    const lessonKey = getCurrentLessonKey();

    if (lessonsContent[lessonKey]) {
        const lessonWords = lessonsContent[lessonKey].split(/\s+/);
        wordsToType.push(...lessonWords);
    } else {
        for (let i = 0; i < wordCount; i++) {
            const words = getRandomWord(modeSelect.value);
            wordsToType.push(words[Math.floor(Math.random() * words.length)]);
        }
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

const highlightNextWord = () => {
    const wordElements = wordDisplay.children;
    for (let i = 0; i < wordElements.length; i++) {
        wordElements[i].style.color = "white";
    }
    if (currentWordIndex < wordElements.length) {
        wordElements[currentWordIndex].style.color = "red";
        wordElements[currentWordIndex].scrollIntoView({ behavior: "smooth", block: "center" });
    }
};

const updateCurrentLetters = () => {
    const input = inputField.value;
    const wordSpans = wordDisplay.children[currentWordIndex]?.querySelectorAll("span");

    if (!wordSpans) return;

    for (let i = 0; i < wordSpans.length - 1; i++) {
        const charSpan = wordSpans[i];
        const expectedChar = charSpan.textContent;
        const typedChar = input[i];

        charSpan.classList.remove("correct", "incorrect");
        if (typedChar == null) continue;
        charSpan.classList.add(typedChar === expectedChar ? "correct" : "incorrect");
    }
};

const updateWord = (event) => {
    if (event.key === " ") {
        const targetWord = wordsToType[currentWordIndex];
        const typedWord = inputField.value.trim();

        let correctChars = 0;
        for (let i = 0; i < typedWord.length; i++) {
            if (typedWord[i] === targetWord[i]) correctChars++;
        }

        totalKeystrokes += correctChars;
        totalCorrectChars += correctChars;
        totalChars += Math.max(typedWord.length, targetWord.length);

        const elapsedMin = (Date.now() - startTime) / 1000 / 60;
        const wpm = totalKeystrokes / 5 / elapsedMin;
        const accuracy = (totalCorrectChars / totalChars) * 100;

        wpmResult.textContent = wpm.toFixed(2);
        accuracyResult.textContent = accuracy.toFixed(2) + "%";

        currentWordIndex++;
        inputField.value = "";
        highlightNextWord();

        if (currentWordIndex >= wordsToType.length) {
            inputField.disabled = true;
            inputField.value = "🎉 Test terminé !";
        }
        event.preventDefault();
    }
};

inputField.addEventListener("input", () => {
    if (!startTime) startTime = Date.now();
    updateCurrentLetters();
});
inputField.addEventListener("keydown", updateWord);

window.addEventListener("DOMContentLoaded", () => {
    startTest();
});
