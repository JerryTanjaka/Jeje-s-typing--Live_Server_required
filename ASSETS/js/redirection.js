
const lesson1 = document.querySelector(".lesson1");
lesson1.addEventListener("click", () => {
    window.location.href = "exo/lesson1.html";
});

const dash = document.getElementById("todashboard");
 dash.addEventListener("click", () => {
     window.location.href = "dashboard.html";
 });



const logout = document.querySelector(".logout");
logout.addEventListener("click", () => {
    window.location.href = "../../index.html";
});