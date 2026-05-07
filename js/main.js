// פס התקדמות בגלילה
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
};

// הפעלת מוזיקת רקע
document.addEventListener("DOMContentLoaded", function() {
    const audio = document.getElementById("myAudio");
    const container = document.getElementById("musicToggle");

    // 1. טעינת מצב קודם מהזיכרון של הדפדפן
    const savedTime = localStorage.getItem("musicTime");
    const isPlaying = localStorage.getItem("musicPlaying") === "true";

    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }

    if (isPlaying) {
        // מנסה להפעיל (חלק מהדפדפנים דורשים לחיצה ראשונית של המשתמש)
        audio.play().then(() => {
            container.classList.add("active");
        }).catch(err => console.log("ממתין ללחיצה להפעלת מוזיקה"));
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

    // 3. שמירת מיקום השיר בכל שנייה
    audio.ontimeupdate = function() {
        localStorage.setItem("musicTime", audio.currentTime);
    };
});
