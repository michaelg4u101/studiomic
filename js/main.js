// פס התקדמות בגלילה
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
};

// הפעלת מוזיקת רקע
const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicBtn");

if (btn) {
    btn.addEventListener("change", function() {
        if (this.checked) {
            music.play().catch(e => console.log("צריך אינטראקציה ראשונית להפעלת סאונד"));
        } else {
            music.pause();
        }
    });
}
