document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('backgroundMusic');

    const toggles = document.querySelectorAll('.flex.items-center.justify-between');

    let soundToggle = null;

    toggles.forEach((toggle) => {
        const span = toggle.querySelector('span');
        if (span && span.textContent.trim() === "Sound") {
            soundToggle = toggle.querySelector('input[type="checkbox"]');
        }
    });

    if (!soundToggle) return;

    const storedSoundSetting = localStorage.getItem('soundSetting');
    if (storedSoundSetting !== null) {
        soundToggle.checked = JSON.parse(storedSoundSetting);
    }

    if (soundToggle.checked) {
        music.volume = 0.5;
        music.play().catch(e => console.log("Erreur lecture audio :", e));
    } else {
        music.pause();
        music.currentTime = 0;
    }

    soundToggle.addEventListener('change', () => {
        localStorage.setItem('soundSetting', JSON.stringify(soundToggle.checked));

        if (soundToggle.checked) {
            music.volume = 0.5;
            music.play().catch(e => console.log("Erreur lecture audio :", e));
        } else {
            music.pause();
            music.currentTime = 0;
        }
    });
});
