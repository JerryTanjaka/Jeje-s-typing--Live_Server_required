window.addEventListener("DOMContentLoaded", () => {
    const logout = document.querySelector(".logout");
    const info = document.getElementById("info");
    const lesson1 = document.querySelector(".lesson1");
    const dash = document.getElementById("todashboard");
    const typing = document.getElementById("typing")
    if (lesson1) {
        lesson1.addEventListener("click", () => {
            window.location.href = "exo/lesson1.html";
        });
    }
    if (typing) {
        typing.addEventListener("click", () => {
            window.location.href = "typing.html";
        });
    }

    if (dash) {
        dash.addEventListener("click", () => {
            window.location.href = "dashboard.html";
        });
    }

    if (logout) {
        logout.addEventListener("click", () => {
            window.location.href = "../../index.html";
        });
    }

    if (info) {
        info.addEventListener("click", () => {
            window.location.href = "info.html";
        });
    }
});
