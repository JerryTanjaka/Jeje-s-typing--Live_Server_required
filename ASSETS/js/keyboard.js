document.addEventListener("DOMContentLoaded", () => {
  const keys = document.querySelectorAll(".key");

  const keyMap = {};
  keys.forEach(key => {
    const value = key.textContent;

    keyMap[value] = key;
  });

  document.addEventListener("keydown", (e) => {
    let key = e.key.toUpperCase();

    const elementTaping = keyMap[key];
    if (elementTaping) {
      elementTaping.classList.remove("bg-slate-800", "text-white");
      elementTaping.classList.add("bg-emerald-400", "text-black");

      setTimeout(() => {
        elementTaping.classList.remove("bg-emerald-400", "text-black");
      }, 200);
    }
  });
});
