import { modeSelect, wordDisplay } from "../../script.js";
const timeCool = (() => {
    const mybtn = document.getElementById("mybtn");
    const timezone = document.getElementById("timezone");
    const timeSelect = document.getElementById("time-select");
    let interval;
    let secondes = parseInt(timeSelect.value);
    let timerStarted = false;
    let blured = false;

    const handleSelectClick = () => {
        stopTimer();
        wordDisplay.classList.add("blur-md");
        blured = true;
    };
    
    timeSelect.addEventListener("click", handleSelectClick);
    modeSelect.addEventListener("click", handleSelectClick);
    
    const handleSelectChange = () => {
        stopTimer();
        startTest();
        inputField.focus();
        updateWordDisplay();
        wordDisplay.classList.remove("blur-md");
        blured = false;
    };
    
    timeSelect.addEventListener("change", handleSelectChange);
    modeSelect.addEventListener("change", handleSelectChange);
    
    document.addEventListener("keydown", (e) => {
        if (blured && e.key === "Enter") {
            wordDisplay.classList.remove("blur-md");
            blured = false;
        }
    });
    

    const start = () => {
        interval = setInterval(decompte, 1000);
        timerStarted = true;
    };

    const stopTimer = () => {
        clearInterval(interval);
        timerStarted = false;
    };

    const decompte = () => {
        if (secondes > 0) {
            secondes--;
            timezone.textContent = secondes;
        } else {
            stopTimer();
            timezone.textContent = "⌛ Temps écoulé !";
            timezone.classList.add("text-red-500", "font-bold", "animate-pulse", "text-[2rem]");
            const inputField = document.getElementById("input-field");
            if (inputField) {
                inputField.disabled = true;
                inputField.value = "Temps écoulé !";
            }
        }
    };

    const launch = () => {
        stopTimer();
        secondes = parseInt(timeSelect.value);
        timezone.textContent = secondes;
        const inputField = document.getElementById("input-field");
        if (inputField) {
            inputField.disabled = false;
            inputField.value = "";
        }
        start();
        mybtn.textContent = "Next>";
    };

    mybtn.addEventListener("click", () => {
        launch();
    });

    document.addEventListener("keydown", () => {
        if (!timerStarted) launch();
        inputField.focus();
    });
})();
