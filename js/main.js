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

    // בדיקה שהאלמנטים קיימים בדף
    if (!audio || !toggleInput) {
        console.error("שגיאה: לא נמצא אלמנט האודיו או כפתור הנגינה בדף");
        return;
    }

    // 1. חיוני: חיבור כפתור ההפעלה קודם כל! (מבטיח עבודה ידנית מלאה ללא תלות בשום שגיאה)
    toggleInput.addEventListener("change", function() {
        if (this.checked) {
            audio.play().catch(err => {
                console.error("הדפדפן חסם את הנגינה:", err);
                this.checked = false;
            });
            localStorage.setItem("musicPlaying", "true");
        } else {
            audio.pause();
            localStorage.setItem("musicPlaying", "false");
        }
    });

    // 2. שחזור בטוח של מצב קודם (עטוף ב-try/catch למניעת קריסת הסקריפט)
    try {
        const savedTime = localStorage.getItem("musictime");
        const isPlaying = localStorage.getItem("musicPlaying") === "true";

        if (savedTime && savedTime !== "undefined") {
            const parsedTime = parseFloat(savedTime);
            if (!isNaN(parsedTime)) {
                // הגדרת הזמן תתבצע רק כאשר קובץ האודיו מוכן ומכיר את אורך השיר
                if (audio.readyState >= 1) {
                    audio.currentTime = parsedTime;
                } else {
                    audio.addEventListener('loadedmetadata', function() {
                        audio.currentTime = parsedTime;
                    }, { once: true });
                }
            }
        }

        // ניסיון הפעלה אוטומטית אם היה מופעל קודם
        if (isPlaying) {
            toggleInput.checked = true;
            audio.play().catch(err => {
                // דפדפנים חוסמים הפעלה אוטומטית ללא קליק ראשוני של המשתמש - זה תקין ונורמלי
                console.log("הפעלה אוטומטית נחסמה עיי הדפדפן, ממתין ללחיצה ידנית המשתמש");
                toggleInput.checked = false;
            });
        }
    } catch (error) {
        console.error("שגיאה בתהליך שחזור הזיכרון של הנגן:", error);
    }

    // 3. שמירת מיקום השיר בכל עדכון זמן בצורה תקנית
    audio.addEventListener('timeupdate', function() {
        localStorage.setItem("musictime", audio.currentTime);
    });
});
