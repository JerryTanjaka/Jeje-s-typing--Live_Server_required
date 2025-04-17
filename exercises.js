let startTime = null;
let interval = null;

const inputField = document.getElementById("user-input");
const display = document.getElementById("text-to-type");
const wpmDisplay = document.querySelector(".wpm");
const accuracyDisplay = document.querySelector(".accuracy");
const timeDisplay = document.querySelector(".time");

const targetText = 'fj fj fj fj j fj fj fj j fj fj fj j fj fj fj j fj fj fj';

function startTimer() {
    if (!startTime) {
        startTime = Date.now();
        interval = setInterval(updateStats, 1000);
    }
}

function updateStats() {
    const elapsedSeconds = (Date.now() - startTime) / 1000;
    const elapsedMinutes = elapsedSeconds / 60;
    const typedText = inputField.value;

    let correctChars = 0;
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === targetText[i]) {
            correctChars++;
        }
    }

    const accuracy = typedText.length > 0
        ? (correctChars / typedText.length) * 100
        : 0;

    const wpm = elapsedMinutes > 0
        ? (typedText.length / 5) / elapsedMinutes
        : 0;

    wpmDisplay.textContent = wpm.toFixed(2);
    accuracyDisplay.textContent = `${accuracy.toFixed(2)}%`;
    timeDisplay.textContent = `${Math.floor(elapsedSeconds)}s`;
}

function updateColoredText() {
    const typed = inputField.value;
    let result = '';

    for (let i = 0; i < targetText.length; i++) {
        const char = targetText[i];
        const userChar = typed[i];

        if (userChar == null) {
            result += `<span>${char}</span>`;
        } else if (userChar === char) {
            result += `<span style="color:green">${char}</span>`;
        } else {
            result += `<span style="color:red">${char}</span>`;
        }
    }

    display.innerHTML = result;
}

document.addEventListener('DOMContentLoaded', () => {
    updateColoredText(); 
    
    inputField.addEventListener("input", () => {
        startTimer();
        updateColoredText();
        updateStats();
    });
});