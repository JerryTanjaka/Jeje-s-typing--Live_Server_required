// Variable pour mémoriser l'heure de début du test
let startTime = null;

// Variable pour mémoriser l'heure de fin du mot précédent
let previousEndTime = null;

// Index du mot actuellement affiché et tapé (début = 0)
let currentWordIndex = 0;

// Tableau qui contiendra tous les mots à taper dans l'ordre
const wordsToType = [];

// Élément HTML pour sélectionner le mode (facile, moyen, difficile)
const modeSelect = document.getElementById("mode");

// Élément HTML où les mots sont affichés à taper
const wordDisplay = document.getElementById("word-display");

// Élément HTML pour le champ de saisie où l'utilisateur tape
const inputField = document.getElementById("input-field");

// Élément HTML pour afficher les résultats (WPM et précision)
const results = document.getElementById("results");

// Liste des mots pour chaque mode (facile, moyen, difficile)
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

// Variable qui stocke la liste des mots à taper dans le mode sélectionné
const wordList = words[modeSelect.value];

// Constantes pour les différents modes de jeu (facile, moyen, difficile)
const easyWords = words.easy;
const mediumWords = words.medium;
const hardWords = words.hard;
