// פס התקדמות בגלילה
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    let progressBar = document.getElementById("progress-bar");
    if (progressBar) {
        progressBar.style.width = scrolled + "%";
    }
};

// הפעלת מוזיקת רקע
document.addEventListener("DOMContentLoaded", function() {
    const audio = document.getElementById("myAudio");
    // שינוי כאן: מחפשים לפי הקלאס הנכון או ה-ID שנתנו ב-HTML
    const container = document.getElementById("musicToggle");

    if (!audio || !container) {
        console.error("שגיאה: לא נמצא אלמנט האודיו או כפתור הנגינה בדף");
        return;
    }

    // 1. טעינת מצב קודם
    const savedTime = localStorage.getItem("musicTime");
    const isPlaying = localStorage.getItem("musicPlaying") === "true";

    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }

    if (isPlaying) {
        audio.play().then(() => {
            container.classList.add("active");
        }).catch(err => console.log("הדפדפן חסם הפעלה אוטומטית - ממתין לקליק"));
    }

    // 2. הפעלה והפסקה בלחיצה
    container.addEventListener("click", function() {
        if (audio.paused) {
            audio.play();
            container.classList.add("active");
            localStorage.setItem("musicPlaying", "true");
        } else {
            audio.pause();
            container.classList.remove("active");
            localStorage.setItem("musicPlaying", "false");
        }
    });

    // 3. שמירת מיקום השיר
    audio.ontimeupdate = function() {
        localStorage.setItem("musicTime", audio.currentTime);
    };
});
