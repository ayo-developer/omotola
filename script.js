// ===== Music + Popup =====
const music = document.getElementById("music");
const startBtn = document.getElementById("startBtn");
const popup = document.getElementById("popup");
const messagePopup = document.getElementById("messagePopup");
const closeMsg = document.getElementById("closeMsg");

startBtn.addEventListener("click", () => {
    music.play();
    popup.style.display = "none";
    audioCtx.resume().then(drawBars); // start visualizer when music starts
});

closeMsg.addEventListener("click", () => {
    // Smooth fade-out for message popup
    messagePopup.classList.add("fadeOut");
    setTimeout(() => {
        messagePopup.style.display = "none";
        messagePopup.classList.remove("fadeOut");
    }, 800);
});

// ===== Confetti Effect =====
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confetti = [];
for (let i = 0; i < 150; i++) {
    confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 2,
        d: Math.random() * 10 + 5,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        tilt: Math.random() * 10 - 10
    });
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
        ctx.beginPath();
        ctx.fillStyle = c.color;
        ctx.fillRect(c.x, c.y, c.r, c.r * 2);
        ctx.fill();
    });
    updateConfetti();
}

function updateConfetti() {
    confetti.forEach(c => {
        c.y += 2;
        c.x += Math.sin(c.tilt) / 2;
        if (c.y > canvas.height) {
            c.y = -10;
            c.x = Math.random() * canvas.width;
        }
    });
}
(function animate() {
    drawConfetti();
    requestAnimationFrame(animate);
})();

// ===== Slideshow =====
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
let slideCount = 0;

function showSlides() {
    slides.forEach((slide, index) => {
        slide.classList.toggle("active", index === currentSlide);
    });

    currentSlide = (currentSlide + 1) % slides.length;
    slideCount++;

    // After one full round, show the personalized message
    if (slideCount === slides.length) {
        setTimeout(() => {
            messagePopup.style.display = "flex";
        }, 1500);
    }
}
setInterval(showSlides, 4000);
showSlides(); // Initial call

// ===== Floating Hearts =====
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.animationDuration = (5 + Math.random() * 5) + "s";
    heart.style.opacity = Math.random();
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
}
setInterval(createHeart, 800);

// ===== Shooting Stars =====
function createStar() {
    const star = document.createElement("div");
    star.classList.add("shooting-star");
    star.style.top = Math.random() * window.innerHeight / 2 + "px";
    star.style.left = Math.random() * window.innerWidth + "px";
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 2000);
}
setInterval(() => {
    if (Math.random() > 0.7) createStar();
}, 3000);

// ===== Music Visualizer =====
const barsCanvas = document.getElementById("musicBars");
const barsCtx = barsCanvas.getContext("2d");
barsCanvas.width = window.innerWidth;
barsCanvas.height = 120;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
const source = audioCtx.createMediaElementSource(music);
source.connect(analyser);
analyser.connect(audioCtx.destination);
analyser.fftSize = 64;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function drawBars() {
    requestAnimationFrame(drawBars);
    analyser.getByteFrequencyData(dataArray);
    barsCtx.clearRect(0, 0, barsCanvas.width, barsCanvas.height);
    const barWidth = (barsCanvas.width / bufferLength) * 2.5;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 1.5;
        barsCtx.fillStyle = `hsl(${i * 20}, 80%, 60%)`;
        barsCtx.fillRect(x, barsCanvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
    }
}
