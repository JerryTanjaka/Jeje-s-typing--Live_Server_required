/**
 * Point culture :
 * Dans ce genre de jeu, un mot équivaut à 5 caractères, y compris les espaces.
 * La précision, c’est le pourcentage de caractères tapés correctement sur tous les caractères tapés.
 *
 * Sur ce... Amusez-vous bien !
 */

let startTime = null,
   previousEndTime = null;
let currentWordIndex = 0;
const wordsToType = [];
const modeSelect = document.getElementById("mode");
const wordDisplay = document.getElementById("word-display");
const inputField = document.getElementById("input-field");
const wpmResult = document.getElementById("wpm-result"); // Zone pour afficher le WPM
const accuracyResult = document.getElementById("accuracy-result"); // Zone pour afficher la précision
const restart = document.getElementById("restart");

const words = {
   easy: ["apple", "banana", "grape", "orange", "cherry"],
   medium: ["keyboard", "monitor", "printer", "charger", "battery"],
   hard: ["synchronize", "complicated", "development", "extravagant", "misconception"],
};

// Générer un mot aléatoire à partir du mode sélectionné
const getRandomWord = (mode) => {
   const wordList = words[mode];
   return wordList[Math.floor(Math.random() * wordList.length)];
};

// Initialiser le test de frappe
const startTest = (wordCount = 25) => {
   wordsToType.length = 0; // Effacer les mots précédents
   wordDisplay.innerHTML = ""; // Effacer l’affichage
   currentWordIndex = 0;
   startTime = null;
   previousEndTime = null;

   // Remplir le tableau avec des mots aléatoires
   for (let i = 0; i < wordCount; i++) {
      wordsToType.push(getRandomWord(modeSelect.value));
   }

   // Afficher les mots à taper
   wordsToType.forEach((word, index) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      if (index === 0) span.style.color = "red"; // Met en surbrillance le premier mot
      wordDisplay.appendChild(span);
   });

   inputField.value = "";
   wpmResult.textContent = "0"; // Réinitialiser le WPM
   accuracyResult.textContent = "0%"; // Réinitialiser la précision
};

// Démarrer le chronomètre dès que l'utilisateur commence à taper
const startTimer = () => {
   if (!startTime) startTime = Date.now();
};

// Calculer et retourner les statistiques WPM & précision
const getCurrentStats = () => {
   const elapsedTime = (Date.now() - previousEndTime) / 1000; // Temps écoulé en secondes
   const wpm = wordsToType[currentWordIndex].length / 5 / (elapsedTime / 60); // 5 caractères = 1 mot
   const accuracy = (wordsToType[currentWordIndex].length / inputField.value.length) * 100;

   return { wpm: wpm.toFixed(2), accuracy: accuracy.toFixed(2) };
};

// Passer au mot suivant et mettre à jour les statistiques uniquement après l'appui sur la barre d'espace
const updateWord = (event) => {
   if (event.key === " ") {
      // Vérifier si la barre d'espace est pressée
      if (inputField.value.trim() === wordsToType[currentWordIndex]) {
         if (!previousEndTime) previousEndTime = startTime;

         const { wpm, accuracy } = getCurrentStats();

         // Mettre à jour les résultats dans les deux <p>
         wpmResult.textContent =  wpm;
         accuracyResult.textContent = `${accuracy}%`;

         currentWordIndex++;
         previousEndTime = Date.now();
         highlightNextWord();

         inputField.value = ""; // Effacer le champ de saisie après l'espace
         event.preventDefault(); // Empêcher l’ajout d’espaces supplémentaires
      }
   }
};

// Mettre en surbrillance le mot actuel en rouge
const highlightNextWord = () => {
   const wordElements = wordDisplay.children;

   if (currentWordIndex < wordElements.length) {
      if (currentWordIndex > 0) {
         wordElements[currentWordIndex - 1].style.color = "#34d399";
      }
      wordElements[currentWordIndex].style.color = "red"; // Mot actuel en rouge
   }
};

// Écouteurs d'événements
// Attacher `updateWord` à `keydown` au lieu de `input`
inputField.addEventListener("keydown", (event) => {
   startTimer(); // Démarrer le chronomètre
   updateWord(event); // Mettre à jour le mot après chaque frappe
});

// Lorsque l'utilisateur change le mode de difficulté
modeSelect.addEventListener("change", () => startTest());

// Démarrer le test au chargement
startTest();

// Focus sur le champ de saisie lorsque l'utilisateur appuie sur une touche
document.addEventListener("keydown", () => {
   inputField.focus();
   restart.classList.remove("active:scale-95");
});

// Relancer le test lorsque l'utilisateur clique sur "Restart"
restart.addEventListener("click", () => {
   restart.classList.add("active:scale-95");
   startTest();
});
