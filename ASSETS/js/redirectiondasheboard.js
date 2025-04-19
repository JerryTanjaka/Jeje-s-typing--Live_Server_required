window.addEventListener("DOMContentLoaded", () => {
    const logout = document.querySelector(".logout");
    const info = document.getElementById("info");
    const lesson1 = document.querySelector(".lesson1");
    const dash = document.getElementById("todashboard");
    const typing = document.getElementById("typing")

    //dasheboard
const beginner1 = document.querySelector(".beginner1")
const beginner2 = document.querySelector(".beginner2")
const beginner3 = document.querySelector(".beginner3")
const amateur1 = document.querySelector(".amateur1")
const amateur2 = document.querySelector(".amateur2")
const amateur3 = document.querySelector(".amateur3")
const professional1 = document.querySelector(".professional1")
const professional2 = document.querySelector(".professional2")
const professional3 = document.querySelector(".professional3")
const jeje1 = document.querySelector(".jeje1")
const jeje2 = document.querySelector(".jeje2")
const jeje3 = document.querySelector(".jeje3")
if (beginner1) {
    beginner1.addEventListener("click", () => {
        window.location.href = "exo/beginnerLesson1.html";
    });
}
if (beginner2) {
    beginner2.addEventListener("click", () => {
        window.location.href = "exo/beginnerLesson2.html";
    });
}
if (beginner3) {
    beginner3.addEventListener("click", () => {
        window.location.href = "exo/beginnerLesson3.html";
    });
}
if (amateur1) {
    amateur1.addEventListener("click", () => {
        window.location.href = "exo/amateurLesson1.html";
    });
}
if (amateur2) {
    amateur2.addEventListener("click", () => {
        window.location.href = "exo/amateurLesson2.html";
    });
}
if (amateur3) {
    amateur3.addEventListener("click", () => {
        window.location.href = "exo/amateurLesson3.html";
    });
}
if (professional1) {
    professional1.addEventListener("click", () => {
        window.location.href = "exo/professionalLesson1.html";
    });
}
if (professional2) {
    professional2.addEventListener("click", () => {
        window.location.href = "exo/professionalLesson2.html";
    });
}
if (professional3) {
    professional3.addEventListener("click", () => {
        window.location.href = "exo/professionalLesson3.html";
    });
}
if (jeje1) {
    jeje1.addEventListener("click", () => {
        window.location.href = "exo/jejeMasterLesson1.html";
    });
}
if (jeje2) {
    jeje2.addEventListener("click", () => {
        window.location.href = "exo/jejeMasterLesson2.html";
    });
}
if (jeje3) {
    jeje3.addEventListener("click", () => {
        window.location.href = "exo/jejeMasterLesson3.html";
    });
}

//other
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
// 
