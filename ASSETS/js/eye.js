const eye = document.getElementById("eye");
const keyboard = document.querySelector(".keyboard")
let openEye = false;
eye.addEventListener("click", () => {
    if (!openEye) {
        eye.innerHTML = ' <i class="fa-regular fa-eye"></i>';
    }else(
        eye.innerHTML =   '<i class="fa-regular fa-eye-slash"></i>'
    )
    if (!openEye) openEye = true;
    else openEye = false;

    if(!openEye)keyboard.className="opacity-0"
    else keyboard.className="opacity-100"
});
