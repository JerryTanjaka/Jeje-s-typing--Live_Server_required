let startTime = null;
let interval = null;

const inputField = document.getElementById("user-input");
const display = document.getElementById("text-to-type");
const wpmDisplay = document.querySelector("#wpm-value");
const accuracyDisplay = document.querySelector("#accuracy-value");
const timeDisplay = document.querySelector("#time-value");

/** Adaptation du code aux autres niveaux d'exercices  */
// Récupérer l'ID du body pour connaître la leçon actuelle
const lessonId = document.body.id;

// Stockage du contenu pour chaque leçon
const lessonsContent = {
    // Level Beginner
    beginnerLesson1: 'fj fj fj fj j fj fj fj j fj fj fj j fj fj fj j fj fj fj fj fj fj fj j fj fj fj j fj fj fj j fj fj fj j fj fj fj fj fj fj fj j fj fj fj j fj fj fj j fj fj fj j fj fj fj',
    beginnerLesson2: "a l a l a l a l a l a l a l a l a l a l a l\nal al al al al la la la al al la al a l a l a l\nal al al al al la la la al al la al a l a l a l\nal al al al al la la la al",
    beginnerLesson3: "the cat sat on the mat. the dog ran fast.\ntap the keys with care. feel the rhythm flow. tap the keys with care. feel the rhythm flow. take your time and breathe. let your fingers go. the sun is up and the sky is blue. the kids run fast in the green park.",
    
    // Level Amateur
    amateurLesson1: "qwerty qwerty qwerty qwerty qwerty qwerty\nqwe rty wer tyq wer tyq wer tyq qwerty qwerty\nqwe rty wer tyq wer tyq wer tyq qwerty qwerty\nqwe rty wer tyq wer tyq wer",
    amateurLesson2: "run sun fun bun. top hop pop stop.\nwe go to the park. you can type fast. run sun fun bun. top hop pop stop. we go to the park. you can type fast. the sun sets slowly over the horizon, casting long shadows across the land.",
    amateurLesson3: "Hello, world! Time to code.\nDon't forget: Shift, Alt, and Ctrl are useful keys. As you start typing, remember to keep your fingers steady and your mind focused. Practice makes perfect, and the more you type, the faster and more accurate you become.",

    // Level Professional
    professionalLesson1: "Speed comes with time, not haste.\nPrecision is the mark of a master.",
    professionalLesson2: "The quick brown fox jumps over the lazy dog.\nTyping becomes easier the more you practice.",
    professionalLesson3: "Price: $5.99 - Discount: 15% off!\nCall us now @ 555-1234 or visit www.example.com.",

    // Top level Jeje's Master
    jejeMasterLesson1: "Ready, set, go! Type like the wind.\nNo pauses. No breaks. Only speed and focus.",
    jejeMasterLesson2: "Perfection is not an act, but a habit.\nKeep your fingers steady. Zero errors allowed.",
    jejeMasterLesson3: "Once upon a time, in a world of code, a typist emerged.\nWrite your own path. Tell your own story. Type freely and fearlessly.",
};

// Texte à taper selon la leçon
const targetText = lessonsContent[lessonId];

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

        // Arrêt de la saisie dans le champ quand le test est fini
        if (inputField.value.length >= targetText.length) {
            inputField.disabled = true;

            document.querySelector(".monitor-container").style.border = "3px solid red";
            document.querySelector(".monitor-container").style.borderRadius = "10px";
            document.querySelector(".monitor-container").style.padding = "1rem";

            // Activer "disabled" de l'input quand l'utilisateur a fini de saisir tout l'exercice
            if (inputField.value.length >= targetText.length) {
                inputField.disabled = true;
            }

            clearInterval(interval);
        }
    });
});

// Redémarrage de tous les compteurs à 0 avec le bouton RESTART
document.addEventListener("DOMContentLoaded", function () {
    const restart = document.getElementById("restartButton")
    restart.addEventListener("click", function () {
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

        // Réinitialiser le texte affiché sans coloration
        display.innerHTML = targetText.split('').map(char => `<span>${char}</span>`).join('');

        // Désactiver "disabled" de l'input quand l'utilisateur appuie sur restart
        inputField.value = "";
        inputField.disabled = false;

        // Enlever la bordure rouge quand on restart
        document.querySelector(".monitor-container").style.border = "";
    })
})