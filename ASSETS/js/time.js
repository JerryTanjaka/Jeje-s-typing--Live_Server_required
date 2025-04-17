(() => {
   const mybtn = document.getElementById("mybtn");
   const timezone = document.getElementById("timezone");
   let interval;
   let secondes = 0;
   let timerStarted = false;

   const start = () => {
      interval = setInterval(decompte, 1000);
      timerStarted = true;
   };

   const stop = () => {
      clearInterval(interval);
      timerStarted = false;
   };

   const decompte = () => {
      secondes++;
      if (secondes > 60) {
         stop();
      } else {
         timezone.textContent = secondes;
      }
   };

   const launch = () => {
      stop();
      secondes = 0;
      timezone.textContent = secondes;
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
