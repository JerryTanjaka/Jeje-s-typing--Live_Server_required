import { inputField, modeSelect, startTest, wordDisplay } from "./script.js";

export const message = document.getElementsByClassName("message")[0];

const timeCool = (() => {
    const mybtn = document.getElementById("mybtn");
    const timezone = document.getElementById("timezone");
    const timeSelect = document.getElementById("time-select");

    let interval;
    let secondes = 0;
    let isInfinite = false;
    let timerStarted = false;
    let blured = false;

    const applyBlur = () => {
        wordDisplay.classList.add("blur-md");
        blured = true;
        message.classList.add("bg-sky-700");
        message.classList.remove("opacity-0");
    };
    const removeBlur = () => {
        wordDisplay.classList.remove("blur-md");
        blured = false;
        message.classList.remove("bg-sky-700");
        message.classList.add("opacity-0");
        inputField.focus();
    };

    const handleSelectClick = () => {
        stopTimer();
        applyBlur();
    };

    timeSelect.addEventListener("click", handleSelectClick);
    modeSelect.addEventListener("click", handleSelectClick);

    const handleSelectChange = () => {
        stopTimer();
        applyBlur();
        isInfinite = timeSelect.value === "infinite";
        secondes = isInfinite ? 0 : parseInt(timeSelect.value);
        timezone.textContent = isInfinite ? "∞" : secondes;
    };

    timeSelect.addEventListener("change", handleSelectChange);
    modeSelect.addEventListener("change", handleSelectChange);

    document.addEventListener("keydown", (e) => {
        if (blured && (e.key === "Enter")) {
            removeBlur();
            startTest();
        }
    });

    const start = () => {
        interval = setInterval(decompte, 1000);
        timezone.classList.remove("text-red-700", "font-bold", "animate-pulse", "text-[2.4rem]");
        timerStarted = true;
    };

    const stopTimer = () => {
        clearInterval(interval);
        timerStarted = false;
    };

    const decompte = () => {
        if (!isInfinite) {
            if (secondes > 0) {
                secondes--;
                timezone.textContent = secondes;
            } else {
                stopTimer();
                timezone.textContent = "⌛ Temps écoulé !";
                timezone.classList.add("text-red-700", "font-bold", "animate-pulse", "text-[2.4rem]", "uppercase");
                const inputField = document.getElementById("input-field");
                if (inputField) {
                    inputField.disabled = true;
                    inputField.value = "Temps écoulé !";
                }
            }
        }
    };

    const launch = () => {
        stopTimer();
        isInfinite = timeSelect.value === "infinite";
        secondes = isInfinite ? 0 : parseInt(timeSelect.value);
        timezone.textContent = isInfinite ? "∞" : secondes;

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
    });
})();
