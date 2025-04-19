const settingsSelector = document.querySelector(".settingsSelector");
const settings = document.querySelector(".settings")
const exit = document.querySelector("#exit")
settingsSelector.addEventListener("click", () => {
    settings.classList.add("absolute")
    exit.classList.remove("opacity-0")
    
});
exit.addEventListener("click",()=>{
    settings.classList.remove("absolute")
    exit.classList.add("opacity-0")

})
function applyThemeFromLocalStorage() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.className = savedTheme;
    }

    const savedLang = localStorage.getItem("preferredLanguage");
    if (savedLang) {
        const select = document.getElementById("languageSelect");
        if (select) select.value = savedLang;
    }
}

window.onload = applyThemeFromLocalStorage;

const buttonstheme = document.querySelectorAll(".theme-btn");
const languageSelect = document.getElementById("languageSelect");

buttonstheme.forEach((button) => {
    button.addEventListener("click", (event) => {
        const theme = event.target.id;
        document.documentElement.className = theme;
        localStorage.setItem("theme", theme);
        if (languageSelect) {
            localStorage.setItem("preferredLanguage", languageSelect.value);
        }
        startTest();
        applyBlur();
    });
});
