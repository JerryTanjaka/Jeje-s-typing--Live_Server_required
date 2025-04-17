const targetText = 'fj fj fj fj '.repeat(5).trim();
const inputField = document.getElementById('user-input');
const display = document.getElementById('text-to-type');

document.addEventListener('DOMContentLoaded', () => {
  
    inputField.addEventListener('input', () => {
      const userText = inputField.value;
      let coloredText = '';
  
      for (let i = 0; i < targetText.length; i++) {        // comparaison entre char et user char : 
        const char = targetText[i];                       // char de la consigne avec fj
        const userChar = userText[i];                     // char saisi par l'utilisateur 
  
        if (userChar == null) {
          coloredText += `<span>${char}</span>`;
        } else if (userChar === char) {
          coloredText += `<span style="color:green">${char}</span>`;
        } else {
          coloredText += `<span style="color:red">${char}</span>`;
        }
      }
  
      display.innerHTML = coloredText;      // remplace le display par les éléments colorés
    });
  });