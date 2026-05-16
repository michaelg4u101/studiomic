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
    const toggleInput = document.getElementById("music-toggle");

    // בדיקה שהאלמנטים קיימים בדף כדי למנוע שגיאות
    if (!audio || !toggleInput) {
        console.error("שגיאה: לא נמצא אלמנט האודיו או כפתור הנגינה בדף");
        return;
    }

    // 1. טעינת מצב קודם מזיכרון הדפדפן (localStorage) עם הגנה משגיאות
    const savedTime = localStorage.getItem("musictime");
    const isPlaying = localStorage.getItem("musicPlaying") === "true";

    // בדיקה שהזמן שנשמר תקין ואינו NaN או undefined
    if (savedTime && savedTime !== "undefined") {
        const parsedTime = parseFloat(savedTime);
        if (!isNaN(parsedTime)) {
            audio.currentTime = parsedTime;
        }
    }

    if (isPlaying) {
        toggleInput.checked = true; // מדליק את הכפתור ויזואלית
        audio.play().catch(err => {
            console.log("הדפדפן חסם הפעלה אוטומטית - ממתין לקליק של המשתמש");
            toggleInput.checked = false; // אם נחסם, נחזיר את הכפתור למצב כבוי
        });
    }

    // 2. הפעלה והפסקה בעת שינוי מצב הכפתור
    toggleInput.addEventListener("change", function() {
        if (this.checked) {
            audio.play().catch(err => console.error("שגיאה בניסיון לנגן:", err));
            localStorage.setItem("musicPlaying", "true");
        } else {
            audio.pause();
            localStorage.setItem("musicPlaying", "false");
        }
    });

    // 3. שמירת מיקום השיר בכל עדכון זמן (תיקון ל-currentTime)
    audio.ontimeupdate = function() {
        localStorage.setItem("musictime", audio.currentTime);
    };
});
