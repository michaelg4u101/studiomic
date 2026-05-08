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
    // זיהוי מדויק של תיבת הסימון לפי ה-ID ב-HTML
    const toggleInput = document.getElementById("music-toggle");

    // בדיקה שהאלמנטים קיימים בדף כדי למנוע שגיאות
    if (!audio || !toggleInput) {
        console.error("שגיאה: לא נמצא אלמנט האודיו או כפתור הנגינה בדף");
        return;
    }

    // 1. טעינת מצב קודם מזיכרון הדפדפן (localStorage)
    const savedTime = localStorage.getItem("musicTime");
    const isPlaying = localStorage.getItem("musicPlaying") === "true";

    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }

    if (isPlaying) {
        toggleInput.checked = true; // מדליק את הכפתור הויזואלית
        audio.play().catch(err => {
            console.log("הדפדפן חסם הפעלה אוטומטית - ממתין לקליק של המשתמש");
            toggleInput.checked = false; // אם נחסם, נחזיר את הכפתור למצב כבוי
        });
    }

    // 2. הפעלה והפסקה בעת שינוי מצב הכפתור (change ולא click, כי זה checkbox)
    toggleInput.addEventListener("change", function() {
        if (this.checked) {
            audio.play();
            localStorage.setItem("musicPlaying", "true");
        } else {
            audio.pause();
            localStorage.setItem("musicPlaying", "false");
        }
    });

    // 3. שמירת מיקום השיר בכל עדכון זמן
    audio.ontimeupdate = function() {
        localStorage.setItem("musicTime", audio.currentTime);
    };
});
