const parent = document.querySelector(".parent");
const settingsSelector = document.querySelector(".settingsSelector");
const settings = document.querySelector(".settings")
const exit = document.querySelector("#exit")
settingsSelector.addEventListener("click", () => {
    parent.classList.add("blur-sm");
    settings.classList.add("absolute","top-0")
    exit.classList.remove("opacity-0")
    
});
exit.addEventListener("click",()=>{

    parent.classList.remove("blur-sm");
    settings.classList.remove("absolute","top-0")
    exit.classList.add("opacity-0")

})
