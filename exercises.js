let startTime = null;
let interval = null;

const inputField = document.getElementById("user-input");
const display = document.getElementById("text-to-type");
const wpmDisplay = document.querySelector("#wpm-value");
const accuracyDisplay = document.querySelector("#accuracy-value");
const timeDisplay = document.querySelector("#time-value");

const targetText = 'fj fj fj fj j fj fj fj j fj fj fj j fj fj fj j fj fj fj';

// Démarrage du chronomètre - setInterval() est une fonction qui exécute une autre toute les X milisecondes 
function startTimer() {
    if (!startTime) {
        startTime = Date.now();
        interval = setInterval(updateStats, 1000);
    }
}

// Mise à jour de WPM et de l'accuracy 
function updateStats() {
    const elapsedSeconds = (Date.now() - startTime) / 1000;
    const elapsedMinutes = elapsedSeconds / 60;
    const typedText = inputField.value;

    // Comptage des caractères corrects tapés par l'utilisateur
    let correctChars = 0;
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === targetText[i]) {
            correctChars++;
        }
    }
    // Calcul en pourcentage de la valeur de l'accuracy 
    const accuracy = typedText.length > 0
        ? (correctChars / typedText.length) * 100
        : 0;

    // Calcul du WPM. PS : 5 caractères pour repère de validation 
    const wpm = elapsedMinutes > 0
        ? (typedText.length / 5) / elapsedMinutes
        : 0;

    wpmDisplay.textContent = wpm.toFixed(2);
    accuracyDisplay.textContent = `${accuracy.toFixed(2)}%`;
    timeDisplay.textContent = `${Math.floor(elapsedSeconds)}s`;
}

// Coloration des caractère corrects ou incorrects saisis par l'utilisateur 
function updateColoredText() {
    const typed = inputField.value;
    let result = '';

    for (let i = 0; i < targetText.length; i++) {
        const char = targetText[i];         // Texte à saisir : fj fj fj...
        const userChar = typed[i];          // Texte saisi par l'utilisateur 

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

// Démarrage du typing-test au moment de l'input de l'utilisateur
document.addEventListener('DOMContentLoaded', () => {
    updateColoredText(); 
    
    inputField.addEventListener("input", () => {
        startTimer();
        updateColoredText();
        updateStats();
    });
}); 

// Redémarrage de tous les compteurs à 0 avec le bouton RESTART
document.addEventListener("DOMContentLoaded", function (){
    const restart = document.getElementById("restartButton")
    restart.addEventListener("click", function (){
        // Stoppe le timer
        clearInterval(interval);
    
        // Réinitialiser toutes les précédentes valeurs
        startTime = null;
        interval = null;
    
        // Remettre le compteur et les stats à zéro
        document.getElementById("time-value").textContent = "0s";
        document.getElementById("accuracy-value").textContent = "0%"
        document.getElementById("wpm-value").textContent = "0"
    
        // Vider le champ de saisie
        document.getElementById("user-input").value = "";
    })
})