function applyThemeFromLocalStorage() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.className = savedTheme;
    }
}             
window.onload = applyThemeFromLocalStorage;
const buttons = document.querySelectorAll(".theme-btn");
buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const theme = event.target.id;
        document.documentElement.className = theme;
        localStorage.setItem("theme", theme);
    });
});
