/**
 * Point culture (en Français car je suis un peu obligé):
 * Dans ce genre de jeu, un mot équivaut à 5 caractères, y compris les espaces.
 * La précision, c'est le pourcentage de caractères tapés correctement par rapport au total de caractères tapés.
 *
 * Sur ce... Amusez-vous bien !
 *
 * @format
 */

let startTime = null,
    previousEndTime = null;
let currentWordIndex = 0;
const wordsToType = [];

const modeSelect = document.getElementById("mode");
const wordDisplay = document.getElementById("word-display");
const inputField = document.getElementById("input-field");
const results = document.getElementById("results");

const words = {
    easy: ["apple", "banana", "grape", "orange", "cherry"],
    medium: ["keyboard", "monitor", "printer", "charger", "battery"],
    hard: [
        "synchronize",
        "complicated",
        "development",
        "extravagant",
        "misconception",
    ],
};

// Génère un mot aléatoire selon le mode sélectionné
const getRandomWord = (mode) => {
    const wordList = words[mode];
    return wordList[Math.floor(Math.random() * wordList.length)];
};

// Initialise le test de frappe
const startTest = (wordCount = 50) => {
    wordsToType.length = 0; // Réinitialise la liste des mots
    wordDisplay.innerHTML = ""; // Vide l'affichage
    currentWordIndex = 0;
    startTime = null;
    previousEndTime = null;

    for (let i = 0; i < wordCount; i++) {
        wordsToType.push(getRandomWord(modeSelect.value));
    }

    // Affiche les mots à taper dans l'interface
    wordsToType.forEach((word, index) => {
        const span = document.createElement("span");
        span.textContent = word + " ";
        if (index === 0) span.style.color = "red"; // Surligne le premier mot en rouge
        wordDisplay.appendChild(span); // Ajoute le mot à l'affichage
    });

    inputField.value = ""; // Vide le champ de saisie
    results.textContent = ""; // Vide les résultats
};

// Lance le chrono dès que l'utilisateur commence à taper
const startTimer = () => {
    if (!startTime) startTime = Date.now();
};

// Calcule et retourne le WPM et la précision
const getCurrentStats = () => {
    const elapsedTime = (Date.now() - previousEndTime) / 1000; // Temps écoulé en secondes
    const wpm = wordsToType[currentWordIndex].length / 5 / (elapsedTime / 60); // 5 caractères = 1 mot
    const accuracy =
        (wordsToType[currentWordIndex].length / inputField.value.length) * 100;
    return { wpm: wpm.toFixed(2), accuracy: accuracy.toFixed(2) };
};

// Passe au mot suivant et met à jour les stats seulement si la barre d'espace est pressée
const updateWord = (event) => {
    if (event.key === " ") {
        // Si l'utilisateur appuie sur espace
        if (inputField.value.trim() === wordsToType[currentWordIndex]) {
            // Si le mot est correct
            if (!previousEndTime) previousEndTime = startTime;

            const { wpm, accuracy } = getCurrentStats();
            results.textContent = `WPM : ${wpm}, Précision : ${accuracy}%`;

            currentWordIndex++; // Passe au mot suivant
            previousEndTime = Date.now();
            highlightNextWord(); // Met en rouge le prochain mot

            inputField.value = ""; // Vide le champ après l’espace
            event.preventDefault(); // Empêche l’ajout d’un espace inutile
        }
    }
};

// Met en rouge le mot actuellement à taper
const highlightNextWord = () => {
    const wordElements = wordDisplay.children;

    if (currentWordIndex < wordElements.length) {
        if (currentWordIndex > 0) {
            wordElements[currentWordIndex - 1].style.color = "black"; // Remet le mot précédent en noir
        }
        wordElements[currentWordIndex].style.color = "red"; // Met le mot actuel en rouge
    }
};

// Écoute les touches appuyées dans le champ de saisie
inputField.addEventListener("keydown", (event) => {
    startTimer(); // Démarre le chrono si ce n’est pas encore fait
    updateWord(event); // Vérifie si le mot est correct
});

// Relance le test si l’utilisateur change de mode
modeSelect.addEventListener("change", () => startTest());

// Lance le test au chargement
startTest();
